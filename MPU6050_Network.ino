#include <I2Cdev.h>
#include <MPU6050.h>
#include <Wire.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <ArduinoJson.h>

const char* SSID = "Raine-iPhone";
const char* PASSWORD = "4373761066";
const char* SERVER_URL = "http://34.71.38.254:5000/api/report/BA-001";

// class default I2C address is 0x68
// specific I2C addresses may be passed as a parameter here
// AD0 low = 0x68 (default for InvenSense evaluation board)
// AD0 high = 0x69
MPU6050 accelgyro;
//MPU6050 accelgyro(0x69); // <-- use for AD0 high

int16_t ax, ay, az;
int16_t gx, gy, gz;

// threshold values for displacement and tilt
float thresholdAX = 0.2;
float thresholdAY = 0.2;
float thresholdAZ = 1.2;
float thresholdGX = 10;
float thresholdGY = 10;
float thresholdGZ = 10;

// Define the size of the circular buffer
const int bufferSize = 22;

// Create a circular buffer to store readings
int readings[bufferSize][6];
int currentIndex = 0;

void setup() {
    // join I2C bus (I2Cdev library doesn't do this automatically)
    #if I2CDEV_IMPLEMENTATION == I2CDEV_ARDUINO_WIRE
        Wire.begin();
    #elif I2CDEV_IMPLEMENTATION == I2CDEV_BUILTIN_FASTWIRE
        Fastwire::setup(400, true);
    #endif

    // initialize serial communication
    // (38400 chosen because it works as well at 8MHz as it does at 16MHz, but
    // it's really up to you depending on your project)
    Serial.begin(9600);

    // initialize device
    Serial.println("Initializing I2C devices...");
    accelgyro.initialize();

    // verify device connection
    Serial.println("Testing device connections...");
    Serial.println(accelgyro.testConnection() ? "MPU6050 connection successful" : "MPU6050 connection failed");

    // change accel/gyro offset values
    Serial.println("Updating internal sensor offsets...");
    //  -640,    2047,    4926,     -33,      -8,      56
    accelgyro.setXAccelOffset(-640);
    accelgyro.setYAccelOffset(2047);
    accelgyro.setZAccelOffset(4926);
    accelgyro.setXGyroOffset(-33);
    accelgyro.setYGyroOffset(-8);
    accelgyro.setZGyroOffset(56);
    Serial.print(accelgyro.getXAccelOffset()); Serial.print("\t");
    Serial.print(accelgyro.getYAccelOffset()); Serial.print("\t");
    Serial.print(accelgyro.getZAccelOffset()); Serial.print("\t");
    Serial.print(accelgyro.getXGyroOffset()); Serial.print("\t");
    Serial.print(accelgyro.getYGyroOffset()); Serial.print("\t");
    Serial.print(accelgyro.getZGyroOffset()); Serial.print("\t");
    Serial.print("\n");
    
    // initialize WiFi connection
    WiFi.mode(WIFI_STA);
    WiFi.begin(SSID, PASSWORD);

    
    while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.println(WiFi.status());
    }
    

    Serial.println(WiFi.localIP());
}

void loop() {
    // read raw accel/gyro measurements from device
    accelgyro.getAcceleration(&ax, &ay, &az);
    accelgyro.getRotation(&gx, &gy, &gz);

    // convert raw data to standard units (g and degree/s)
    // Divide by sensitivity scale factor
    ax = ax / 16384.0; ay = ay / 16384.0; az = az / 16384.0;
    gx = gx / 131.0; gy = gy / 131.0; gz = gz / 131.0;

    // Store the readings in the circular buffer
    readings[currentIndex][0] = ax;
    readings[currentIndex][1] = ay;
    readings[currentIndex][2] = az;
    readings[currentIndex][3] = gx;
    readings[currentIndex][4] = gy;
    readings[currentIndex][5] = gz;

    // Update the index, considering the circular nature of the buffer
    currentIndex = (currentIndex + 1) % bufferSize;

    // Detect acceleration
    Serial.print("Acceleration: ");
    Serial.print(ax);
    Serial.print(", ");
    Serial.print(ay);
    Serial.print(", ");
    Serial.print(az);
    Serial.println("g; ");
    if (abs(ax) > thresholdAX || abs(ay) > thresholdAY || abs(az) > thresholdAZ) {   
        Serial.println("Notable displacement detected!");
        sendAbnormality(currentIndex);
    }

    // detect rotation
    Serial.print("Rotation: ");
    Serial.print(gx);
    Serial.print(", ");
    Serial.print(gy);
    Serial.print(", ");
    Serial.print(gz);
    Serial.println("°/s");
    if (abs(gx) > thresholdGX || abs(gy) > thresholdGY || abs(gz) > thresholdGZ) {   
        Serial.println("Notable tilt detected!");
        sendAbnormality(currentIndex);
    }
    
    delay(1000);
}


void sendAbnormality(int index) {
  // check wifi connection
  if (WiFi.status() != WL_CONNECTED) {
      Serial.println("Error in WiFi connection");
      return;
  }

  HTTPClient http;
  WiFiClient client;

  http.begin(client, SERVER_URL); // open connection
  http.addHeader("Content-Type", "application/json"); // send json message

  // construct json message
  String jsonMessage = "[";
  for (int i = 0; i < bufferSize; i++) {
    jsonMessage += "[";
    for (int j = 0; j < 6; j++) {
      jsonMessage += readings[(index + i) % bufferSize][j];
      if (j != 5) {
        jsonMessage += ", ";
      }
    }
    jsonMessage += "],";
  }
  jsonMessage += "]";

  Serial.println(jsonMessage);
  int httpCode = http.POST(jsonMessage);

  http.end(); // close connection
  Serial.println("Report issue to server, status: "); Serial.print(httpCode);
}