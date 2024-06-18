'use client';

import { SoilMoistureType, Feed, Channel } from '@/lib/types';
import mqtt from 'mqtt';
import { useEffect, useState } from 'react';

// read api = PMW7A3RMANH5IGQV
// channel id = 2531063
// Broker url = mqtt3.thingspeak.com
// port = 1883

const MQTT_BROKER_URL = 'mqtt://mqtt3.thingspeak.com:1883';
const CHANNEL_ID = '2531063';
const READ_API_KEY = 'MW7A3RMANH5IGQV';
const PORT = 1883;

const MQTT = () => {
  const [recentData, setRecentData] = useState<SoilMoistureType | null>(null);
  useEffect(() => {
    const client = mqtt.connect('mqtt://mqtt3.thingspeak.com:1883', {
      clientId: 'EicpHA0AOAoBETUBKSoHEA4',
      username: 'EicpHA0AOAoBETUBKSoHEA4',
      password: '50YEaMjEuNU7f3p64bieJNo5',
      clean: true,
    });

    console.log(client)

    client.on('connect', () => {
      client.subscribe(`channels/${CHANNEL_ID}/subscribe`);
    });

    client.on('message', (topic, message) => {
      const payload: Feed = JSON.parse(message.toString());
      setRecentData((prevData) => {
        if (!prevData) return null; // Handle initial state

        // Ensure the channel data remains unchanged
        const updatedChannel: Channel = {
          ...prevData.channel,
          last_entry_id: payload.entry_id,
        };

        // Update feeds array with new payload
        const updatedFeeds: Feed[] = [...prevData.feeds, payload];

        // Return updated SoilMoistureType object
        return {
          ...prevData,
          channel: updatedChannel,
          feeds: updatedFeeds,
        };
      });
    });

    return () => {
      client.end();
    };

  }, []);

  const lastFeed = recentData?.feeds[recentData.feeds.length - 1];
  console.log(lastFeed)
  return <div>mqqt</div>;
};

export default MQTT;
