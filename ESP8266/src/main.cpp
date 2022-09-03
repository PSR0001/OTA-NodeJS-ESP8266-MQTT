
// #include "main.h"
#include <WiFiManager.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266httpUpdate.h>
#include <PubSubClient.h>

WiFiClient espClient;
PubSubClient client(espClient);

#define MSG_BUFFER_SIZE (50)

const char *mqtt_server = "broker.mqtt-dashboard.com";
unsigned long lastMsg = 0;
char msg[MSG_BUFFER_SIZE];
// Create a random client ID
String clientId = "ESP" + String(ESP.getChipId());

// Function Prototype:
void wifi_setup();
void callback(char *topic, byte *payload, unsigned int length);
void reconnect();
void update_started();
void update_finished();
void update_progress(int cur, int total);
void update_error(int err);

void setup()
{
    // WiFi.mode(WIFI_STA); // WifiManager have WiFi.mode(WIFI_STA); set
    //  it is a good practice to make sure your code sets wifi mode how you want it.

    pinMode(BUILTIN_LED, OUTPUT);
    // put your setup code here, to run once:
    Serial.begin(115200);
    wifi_setup();
    client.setServer(mqtt_server, 1883);
    client.setClient(espClient);
    client.setCallback(callback);
    digitalWrite(BUILTIN_LED,HIGH);
}

void loop()
{
    // put your main code here, to run repeatedly:
    if (!client.connected())
    {
        reconnect();
    }
    client.loop();
}

void wifi_setup()
{
    // WiFiManager, Local intialization. Once its business is done, there is no need to keep it around
    WiFiManager wm;
    // wm.resetSettings();
    bool res;
    res = wm.autoConnect(); // auto generated AP name from chipid

    if (!res)
    {
        Serial.println(F("Failed to connect"));
        ESP.restart();
        delay(2000);
    }
    else
    {
        // if you get here you have connected to the WiFi
        Serial.println(F("connected..."));
    }
}

void callback(char *topic, byte *payload, unsigned int length)
{
    // debug purpose
    Serial.println(F("Message arrived "));
    for (int i = 0; i < length; i++)
    {
        Serial.print((char)payload[i]);
    }
    // Switch on the LED if an 1 was received as first character
    if ((char)payload[0] == '1')
    {
        digitalWrite(BUILTIN_LED, LOW); // Turn the LED on (Note that LOW is the voltage level
          while(1){
            Serial.println(F("Updating..."));
            // call the update function;
            ESPUpdate(); 
            Serial.println(F("Done..."));
        }
    }
    else
    {
        digitalWrite(BUILTIN_LED, HIGH); // Turn the LED off by making the voltage HIGH
    }
}

void reconnect()
{
    // Loop until we're reconnected
    while (!client.connected())
    {
        Serial.print(F("Attempting MQTT connection..."));
        // Attempt to connect
        if (client.connect(clientId.c_str()))
        {
            Serial.println(F("connected"));
            // resubscribe
            client.subscribe("device/123input");
        }
        else
        {
            Serial.print(F("failed, rc="));
            Serial.print(client.state());
            // Wait 5 seconds before retrying
            delay(5000);
        }
    }
}

void ESPUpdate()
{
    

        ESPhttpUpdate.setLedPin(LED_BUILTIN, LOW);

        // Add optional callback notifiers
        ESPhttpUpdate.onStart(update_started);
        ESPhttpUpdate.onEnd(update_finished);
        ESPhttpUpdate.onProgress(update_progress);
        ESPhttpUpdate.onError(update_error);

        // t_httpUpdate_return ret = ESPhttpUpdate.update(client, '192.168.43.73', 80, "/blink");
        // t_httpUpdate_return ret = ESPhttpUpdate.update(client,"192.168.43.73", 80, "/blink");
        t_httpUpdate_return ret = ESPhttpUpdate.update(espClient, "192.168.43.73", 80, "/blink");

        switch (ret)
        {
        case HTTP_UPDATE_FAILED:
            Serial.printf("HTTP_UPDATE_FAILD Error (%d): %s\n", ESPhttpUpdate.getLastError(), ESPhttpUpdate.getLastErrorString().c_str());
            break;

        case HTTP_UPDATE_NO_UPDATES:
            Serial.println(F("HTTP_UPDATE_NO_UPDATES"));
            break;

        case HTTP_UPDATE_OK:
            Serial.println(F("HTTP_UPDATE_OK"));
            break;
        }
    
}

// callback functions
void update_started()
{
    Serial.println(F("CALLBACK:  HTTP update process started"));
}

void update_finished()
{
    Serial.println(F("CALLBACK:  HTTP update process finished"));
}

void update_progress(int cur, int total)
{
    Serial.printf("CALLBACK:  HTTP update process at %d of %d bytes...\n", cur, total);
}

void update_error(int err)
{
    Serial.printf("CALLBACK:  HTTP update fatal error code %d\n", err);
}
