
// #include "main.h"
#include <WiFiManager.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266httpUpdate.h>
#include <PubSubClient.h>

// OUTPUT STATES
#define AIR_CONDITIONAR_ON '2'
#define BEDROOM_LIGHT_ON '3'
#define FAN_ON '4'
#define MAIN_LIGHT_ON '5'
#define AIR_CONDITIONAR_OFF '6'
#define BEDROOM_LIGHT_OFF '7'
#define FAN_OFF '8'
#define MAIN_LIGHT_OFF '9'

// INITIAL OUTPUT PINS
#define AC_PIN D7
#define BEDROOM_LIGHT_PIN D6
#define FAN_PIN D5
#define MAIN_LIGHT_PIN D4
#define AC_SWITCH_PIN D3
#define BEDROOM_LIGHT_SWITCH_PIN D2
#define FAN_SWITCH_PIN D1
#define MAIN_LIGHT_SWITCH_PIN D0

WiFiClient espClient;
PubSubClient client(espClient);

#define MSG_BUFFER_SIZE (10)

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
void ESPUpdateNow();

void setup()
{
    // WiFi.mode(WIFI_STA); // WifiManager have WiFi.mode(WIFI_STA); set
    //  it is a good practice to make sure your code sets wifi mode how you want it.

    pinMode(AC_PIN, OUTPUT);
    pinMode(BEDROOM_LIGHT_PIN, OUTPUT);
    pinMode(FAN_PIN, OUTPUT);
    pinMode(MAIN_LIGHT_PIN, OUTPUT);

    pinMode(AC_SWITCH_PIN, INPUT);
    pinMode(BEDROOM_LIGHT_SWITCH_PIN, INPUT);
    pinMode(FAN_SWITCH_PIN, INPUT);
    pinMode(MAIN_LIGHT_SWITCH_PIN, INPUT);

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
    if (!client.connected())
    {
        reconnect();
    }
    client.loop();

    bool AC_STATE = digitalRead(AC_SWITCH_PIN);
    bool BEDROOM_LIGHT_STATE = digitalRead(BEDROOM_LIGHT_SWITCH_PIN);
    bool FAN_STATE = digitalRead(FAN_SWITCH_PIN);
    bool MAIN_LIGHT_STATE = digitalRead(MAIN_LIGHT_SWITCH_PIN);

    if (AC_STATE == 1)
    {
        digitalWrite(AC_PIN, HIGH);
    }
    if (BEDROOM_LIGHT_STATE == 1)
    {
        digitalWrite(BEDROOM_LIGHT_PIN, HIGH);
    }
    if (FAN_STATE == 1)
    {
        digitalWrite(FAN_PIN, HIGH);
    }
    if (MAIN_LIGHT_STATE)
    {
        digitalWrite(MAIN_LIGHT_PIN, HIGH);
    }
    
    









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

    char status = (char)payload[0];

    switch (status)
    {
    case AIR_CONDITIONAR_ON:
        delay(30); // delay for 30ms
        digitalWrite(AC_PIN, HIGH);
        break;
    case BEDROOM_LIGHT_ON:
        delay(30); // delay for 30ms
        digitalWrite(BEDROOM_LIGHT_PIN, HIGH);
        break;
    case FAN_ON:
        delay(30); // delay for 30ms
        digitalWrite(FAN_PIN, HIGH);
        break;
    case MAIN_LIGHT_ON:
        delay(30); // delay for 30ms
        digitalWrite(MAIN_LIGHT_PIN, HIGH);
        break;
    case AIR_CONDITIONAR_OFF:
        delay(30); // delay for 30ms
        digitalWrite(AC_PIN, LOW);
        break;
    case BEDROOM_LIGHT_OFF:
        delay(30); // delay for 30ms
        digitalWrite(BEDROOM_LIGHT_PIN, LOW);
        break;
    case FAN_OFF:
        delay(30); // delay for 30ms
        digitalWrite(FAN_PIN, LOW);
        break;
    case MAIN_LIGHT_OFF:
        delay(30); // delay for 30ms
        digitalWrite(MAIN_LIGHT_PIN, LOW);
        break;

    default:
        break;
    }

    // Switch on the LED if an 1 was received as first character
    if ((char)payload[0] == '1')
    {
        // Turn the LED on (Note that LOW is the voltage level
        while (1)
        {
            // Serial.println(F("Updating..."));
            //  call the update function;
            ESPUpdateNow();
            // Serial.println(F("Done..."));
        }
    }
    else
    {
        // digitalWrite(BUILTIN_LED, HIGH); // Turn the LED off by making the voltage HIGH
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

void ESPUpdateNow()
{

    // ESPhttpUpdate.setLedPin(LED_BUILTIN, LOW);

    // Add optional callback notifiers
    ESPhttpUpdate.onStart(update_started);
    ESPhttpUpdate.onEnd(update_finished);
    ESPhttpUpdate.onProgress(update_progress);
    ESPhttpUpdate.onError(update_error);

    // t_httpUpdate_return ret = ESPhttpUpdate.update(client, '192.168.43.73', 80, "/blink");
    // t_httpUpdate_return ret = ESPhttpUpdate.update(client,"192.168.43.73", 80, "/blink");
    t_httpUpdate_return ret = ESPhttpUpdate.update(espClient, "192.168.43.73", 80, "/updateesp");

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
