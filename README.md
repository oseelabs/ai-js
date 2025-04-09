

![npm](https://img.shields.io/npm/v/@oseelabs/ai-js)
![npm](https://img.shields.io/npm/l/@oseelabs/ai-js)
![npm](https://img.shields.io/npm/dw/@oseelabs/ai-js)
![npm](https://img.shields.io/github/last-commit/oseelabs/ai-js)
![npm](https://img.shields.io/github/languages/top/oseelabs/ai-js)
![npm](https://img.shields.io/github/languages/count/oseelabs/ai-js)
![npm](https://img.shields.io/github/languages/code-size/oseelabs/ai-js)
![npm](https://img.shields.io/github/release-date/oseelabs/ai-js)
<!-- ![npm](https://img.shields.io/github/forks/oseelabs/ai-js) -->
<!-- ![npm](https://img.shields.io/github/stars/oseelabs/ai-js) -->
<!-- ![npm](https://img.shields.io/github/contributors/oseelabs/ai-js) -->
<!-- ![npm](https://img.shields.io/github/repo-size/oseelabs/ai-js) -->
<!-- ![npm](https://img.shields.io/github/issues/oseelabs/ai-js)
![npm](https://img.shields.io/github/issues-raw/oseelabs/ai-js) -->
<!-- ![npm](https://img.shields.io/bundlephobia/minzip/@oseelabs/ai-js) -->


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

- A JavaScript library that provides a simple and efficient way to interact with Generative ai JavaScript SDKs and APIS. It is designed to be easy to use and integrate into your existing projects, while also providing powerful features for advanced users.
---

## Installation
To install the package, you can use any of the following package managers:

- Using `npm`:
```bash
npm install @oseelabs/ai-js
```

- Using `yarn`:
```bash
yarn add @oseelabs/ai-js
```

- Using `pnpm`:
```bash
pnpm add @oseelabs/ai-js
```

- Using `bun`:
```bash
bun add @oseelabs/ai-js
```

- Using `volta`:
```bash
volta add @oseelabs/ai-js
```

## Usage

```typescript

// Import the OseeLabs class from the package
import { Init } from '@oseelabs/ai-js';

// Create an instance of the OseeLabs class
const genai = new Init(
    "YOUR_GEMINI_API_KEY",
    {} as GoogleGenAIOptions,
);

const response = await genai.generateContent(
    "What is AI?",
    {} as GenerateContentConfig
);

console.log(response.text);

```


## Contributing

We welcome contributions to the OseeLabs AI JavaScript SDK! If you have any ideas, suggestions, or bug fixes, please feel free to open an issue or submit a pull request.

Please make sure to follow the [contribution guidelines](CONTRIBUTING.md) when submitting your contributions.

## License
This project is licensed under the [MIT License](LICENSE).
For more details, please refer to the [LICENSE](LICENSE) file.

This project is developed and maintained by the OseeLabs team. We appreciate your support and contributions to make this project better!
- [OseeLabs Website](https://oseelabs.org)
- [Email us](mailto:oseelabs@gmail.com)

## Acknowledgements
- [OseeLabs](https://oseelabs.org) for providing the foundation for this project.
- [Google Gemini](https://aistudio.google.com/search/) for providing the Generative AI API.
<!-- - [OpenAI](https://openai.com/) for providing the Generative AI API.
- [Anthropic](https://www.anthropic.com/) for providing the Generative AI API.
- [Cohere](https://cohere.ai/) for providing the Generative AI API. -->

## Disclaimer

This project is not affiliated with or endorsed by any of the mentioned companies. The use of their APIs and services is subject to their respective terms and conditions.

This project is provided "as is" without any warranties or guarantees. The authors and contributors are not responsible for any damages or losses caused by the use of this project.

