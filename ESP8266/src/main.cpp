
// #include "main.h"
#include <WiFiManager.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266httpUpdate.h>


 // https://github.com/tzapu/WiFiManager
void wifi_setup();

void setup() {
    WiFi.mode(WIFI_STA); 
    // it is a good practice to make sure your code sets wifi mode how you want it.

    // put your setup code here, to run once:
    Serial.begin(115200);
    wifi_setup();


}

void loop() {
    // put your main code here, to run repeatedly:   
}



void wifi_setup(){
      //WiFiManager, Local intialization. Once its business is done, there is no need to keep it around
    WiFiManager wm;
    // wm.resetSettings();
    bool res;
    res = wm.autoConnect(); // auto generated AP name from chipid

    if(!res) {
        Serial.println(F("Failed to connect"));
        ESP.restart();
        delay(2000);
    } 
    else {
        //if you get here you have connected to the WiFi    
        Serial.println(F("connected..."));
    }
}
















