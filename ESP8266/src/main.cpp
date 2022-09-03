
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



// https://github.com/tzapu/WiFiManager
void wifi_setup();
void callback(char *topic, byte *payload, unsigned int length);
void reconnect();

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
}

void loop()
{
    // put your main code here, to run repeatedly:
    if (!client.connected()){reconnect();
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
                                        // call the update function
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




