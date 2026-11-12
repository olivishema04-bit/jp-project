// MQTT Topics (Must match your ESP32 code)
const topicVoltage = 'esp32/user123/voltage';
const topicLedStatus = 'esp32/user123/led_status';
const topicLedControl = 'esp32/user123/led_control';

// Connect to HiveMQ Public Broker via Secure WebSockets
const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

const statusBadge = document.getElementById('connection-status');
const voltText = document.getElementById('volt');
const voltBar = document.getElementById('volt-bar');
const ledStatusText = document.getElementById('status');
const ledBulb = document.getElementById('led-bulb');

// When browser connects to HiveMQ
client.on('connect', () => {
  statusBadge.innerText = 'Connected';
  statusBadge.className = 'badge connected';

  client.subscribe(topicVoltage);
  client.subscribe(topicLedStatus);
});

// Handle connection loss
client.on('close', () => {
  statusBadge.innerText = 'Disconnected';
  statusBadge.className = 'badge disconnected';
});

// Receive live data from ESP32
client.on('message', (topic, message) => {
  const payload = message.toString();

  if (topic === topicVoltage) {
    const voltage = parseInt(payload, 10) || 0;
    voltText.innerText = voltage;
    voltBar.style.width = `${Math.min(Math.max(voltage, 0), 100)}%`;
  }

  if (topic === topicLedStatus) {
    ledStatusText.innerText = payload;
    if (payload === 'ON') {
      ledBulb.className = 'led-bulb on';
    } else {
      ledBulb.className = 'led-bulb off';
    }
  }
});

// Send control command to ESP32
function sendCmd(cmd) {
  client.publish(topicLedControl, cmd);

  // Highlight active button
  document.getElementById('btn-auto').classList.toggle('active', cmd === 'AUTO');
  document.getElementById('btn-on').classList.toggle('active', cmd === 'ON');
  document.getElementById('btn-off').classList.toggle('active', cmd === 'OFF');
}
// MQTT Topics (Must match your ESP32 code)
const topicVoltage = 'esp32/user123/voltage';
const topicLedStatus = 'esp32/user123/led_status';
const topicLedControl = 'esp32/user123/led_control';

// Connect to HiveMQ Public Broker via Secure WebSockets
const client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');

const statusBadge = document.getElementById('connection-status');
const voltText = document.getElementById('volt');
const voltBar = document.getElementById('volt-bar');
const ledStatusText = document.getElementById('status');
const ledBulb = document.getElementById('led-bulb');

// When browser connects to HiveMQ
client.on('connect', () => {
  statusBadge.innerText = 'Connected';
  statusBadge.className = 'badge connected';

  client.subscribe(topicVoltage);
  client.subscribe(topicLedStatus);
});

// Handle connection loss
client.on('close', () => {
  statusBadge.innerText = 'Disconnected';
  statusBadge.className = 'badge disconnected';
});

// Receive live data from ESP32
client.on('message', (topic, message) => {
  const payload = message.toString();

  if (topic === topicVoltage) {
    const voltage = parseInt(payload, 10) || 0;
    voltText.innerText = voltage;
    voltBar.style.width = `${Math.min(Math.max(voltage, 0), 100)}%`;
  }

  if (topic === topicLedStatus) {
    ledStatusText.innerText = payload;
    if (payload === 'ON') {
      ledBulb.className = 'led-bulb on';
    } else {
      ledBulb.className = 'led-bulb off';
    }
  }
});

// Send control command to ESP32
function sendCmd(cmd) {
  client.publish(topicLedControl, cmd);

  // Highlight active button
  document.getElementById('btn-auto').classList.toggle('active', cmd === 'AUTO');
  document.getElementById('btn-on').classList.toggle('active', cmd === 'ON');
  document.getElementById('btn-off').classList.toggle('active', cmd === 'OFF');
}
