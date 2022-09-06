#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <DNSServer.h>
#include <ESP8266mDNS.h>
#include <EEPROM.h>
#include <memory>

// ESP Server
ESP8266WebServer server(80);

void handleRoot(){
  String page = "1 0 1 0";
    server.sendHeader("Content-Length", String(page.length()));
    server.send(200, "text/html", page);
}


void setup()
{
  
delay(1000);
Serial.begin(115200);
  Serial.print(F("Connecting to : "));
  WiFi.mode(WIFI_STA);
  WiFi.begin("vivo 1816", "12345PSR");

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(200);
    Serial.print(". ");
  }
  Serial.print(F("\nConnected with "));
  Serial.print(F("IP address: "));
  Serial.println(WiFi.localIP());
  
   server.on("/", handleRoot);
  server.begin(); // Web server start
}

void loop()
{
  // HTTP
  server.handleClient();
}
