#ifndef _main_h
#define _main_h

#if defined(ESP8266)
#include <WiFiManager.h>
#include <ESP8266httpUpdate.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266httpUpdate.h>
#include <WiFiManager.h>

#elif defined(ESP32)
#include "WiFi.h"
#endif

const char* mqtt_server = "5.196.95.208";


#endif