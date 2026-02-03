# Weather API

Project Challenge: [roadmap.sh - Weather API](https://roadmap.sh/projects/weather-api-wrapper-service)

A fast weather tool that "remembers" the weather for you. It uses Redis to save results so it doesn't have to ask the weather site over and over, making it way quicker. Plus, it has a built-in limit to stop people from spamming your server.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/p-e-g-a-h/roadmap.sh_projects.git
```

2. **Navigate to the project folder:**

```bash
cd "roadmap.sh_projects/Backend Projects/Weather API"
```

3. **Install dependencies:**

```bash
npm install
```

4. **Configure Environment Variables:** Create a .env file in the root directory:

```env
PORT=3000
WEATHER_API_KEY=your_visual_crossing_api_key
REDIS_URL=redis://localhost:6379
```

5. **Start the server:**

```bash
npm start
```

## Usage

### Public Route

| Method | Route                    | Description                                                                |
| ------ | ------------------------ | -------------------------------------------------------------------------- |
| `GET`  | `/weather/api/:location` | Returns current weather for the specified city (e.g., /weather/api/london) |
