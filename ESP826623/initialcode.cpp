#include <WiFiManager.h>
#include <ESP8266httpUpdate.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266httpUpdate.h>

#ifdef ESP8266
uint32_t chipID = ESP.getChipId();
#endif
WiFiManager WiFimanager;

// Function prototype
void WiFiConnected();


//callback functions
void update_started() {
  Serial.println("CALLBACK:  HTTP update process started");
}

void update_finished() {
  Serial.println("CALLBACK:  HTTP update process finished");
}

void update_progress(int cur, int total) {
  Serial.printf("CALLBACK:  HTTP update process at %d of %d bytes...\n", cur, total);
}

void update_error(int err) {
  Serial.printf("CALLBACK:  HTTP update fatal error code %d\n", err);
}





void setup()
{
    WiFimanager.resetSettings();

    // put your setup code here, to run once:
    Serial.begin(115200);
    WiFiConnected();
    
}

void loop()
{

    // put your main code here, to run repeatedly:

       WiFiClient client;

    ESPhttpUpdate.setLedPin(LED_BUILTIN, LOW);

    // Add optional callback notifiers
    ESPhttpUpdate.onStart(update_started);
    ESPhttpUpdate.onEnd(update_finished);
    ESPhttpUpdate.onProgress(update_progress);
    ESPhttpUpdate.onError(update_error);

    // t_httpUpdate_return ret = ESPhttpUpdate.update(client, '192.168.43.73', 80, "/blink");
//    t_httpUpdate_return ret = ESPhttpUpdate.update(client, '', 80, "");
    t_httpUpdate_return ret = ESPhttpUpdate.update(client, "192.168.43.73", 80, "/blink");

    switch (ret) {
      case HTTP_UPDATE_FAILED:
        Serial.printf("HTTP_UPDATE_FAILD Error (%d): %s\n", ESPhttpUpdate.getLastError(), ESPhttpUpdate.getLastErrorString().c_str());
        break;

      case HTTP_UPDATE_NO_UPDATES:
        Serial.println("HTTP_UPDATE_NO_UPDATES");
        break;

      case HTTP_UPDATE_OK:
        Serial.println("HTTP_UPDATE_OK");
        break;
    }
}

// WiFi Function
void WiFiConnected()
{
    WiFi.mode(WIFI_STA);
    bool res;

    res = WiFimanager.autoConnect("ESP8266_EX_69", "user"); // password protected ap

    if (!res)
    {
        ESP.restart();
    }
}
