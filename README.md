Collecting workspace information

Sure, here is a README for your project:

```md
# Codeforces Contest Tracker

This project is a web application that tracks Codeforces contests and displays standings for each contest. It is built using React, TypeScript, and Tailwind CSS.

## Features

- List of all Codeforces contests
- Filter contests by status (all, upcoming, ongoing, past)
- Search contests by name
- View standings for each contest
- Search participants in the standings
- Dark mode toggle

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/codeforces-contest-tracker.git
   cd codeforces-contest-tracker
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Edit `codeforces-contest-tracker\src\utils\api.ts` the file and add your Codeforces API key and secret:

   ```const API_KEY = 'your codeforces api key';
const API_SECRET = 'your codeforces api secret key';
const BASE_URL = 'https://codeforces.com/api';
   ```

### Running the Application

To start the development server, run:

```sh
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:3000`.

### Building for Production

To build the application for production, run:

```sh
npm run build
# or
yarn build
```

The production-ready files will be in the `dist` directory.

### Linting

To lint the code, run:

```sh
npm run lint
# or
yarn lint
```

## Project Structure

- 

src

: Contains the source code
  - `components/`: React components
  - `hooks/`: Custom hooks
  - `types/`: TypeScript types
  - `utils/`: Utility functions
  - 

App.tsx

: Main application component
  - 

main.tsx

: Entry point of the application
- `public/`: Public assets
- 

index.html

: HTML template

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
```

Feel free to customize it further based on your specific needs.
Feel free to customize it further based on your specific needs.