# Table of Contents

- [Course Platform Overview](#course-platform-overview)
  - [Access and Navigation](#access-and-navigation)
  - [Enrollment and Experience](#enrollment-and-experience)
  - [Course Structure](#course-structure)
  - [Discord Support](#discord-support)
  - [Features and Offerings](#features-and-offerings)
  - [Cohorts and Certification](#cohorts-and-certification)
    - [NFT Certificates](#nft-certificates)
    - [Key Features of the NFT Certificates](#key-features-of-the-nft-certificates)
  - [Multi-Language Support and Open-Source Content](#multi-language-support-and-open-source-content)
- [How To Contribute](#how-to-contribute)
  - [Requirements](#requirements)
  - [Environment](#environment)
  - [Loading Firebase Contents on Your Project](#loading-firebase-contents-on-your-project)
  - [Getting Started](#getting-started)

# Course Platform Overview

Our practical learning platform, located at [build.w3d.community](http://build.w3d.community/), offers courses focused on blockchain and web3 technologies. Here’s a quick guide to get you started:

## Access and Navigation

- **Homepage**: The starting point showcasing our latest or current course.
  
  ![Course Homepage](public/homepage.png)

- **All Courses**: For a detailed list of all available courses, visit our course catalog at [build.w3d.community/courses](https://build.w3d.community/courses).

## Enrollment and Experience

- To participate in courses, users must sign in using a Google account or GitHub.
- For a comprehensive experience, connect your MetaMask/Ethereum wallet and Discord account. This allows for receiving NFT Certificates and accessing support channels.

  ![Connect Wallet and Discord](public/connections.png)

## Course Structure

Courses are organized into five key sections. Each section contains lessons with a specific area where students can enter their code. This setup is aimed at helping students fully understand the topics covered.

![Connect Wallet and Discord](public/course_structure.png)

## Discord Support

Our Discord community mirrors the course structure, offering dedicated channels for each of the 5 sections, along with channels for sharing progress and obtaining general support.

![Discord Channels](public/discord_channels.png)

## Features and Offerings

- **NFT Certificates**: On course completion, participants receive an non-transferable NFT, viewable in our [OpenSea Collection](https://opensea.io/collection/web3dev-bootcamp).
- **Mentorship**: Graduates can become mentors, helping new students through their learning journey.

## Cohorts and Certification

- We offer both "Eternal" cohorts for asynchronous learning and event-based cohorts with live coding sessions.
- Courses typically last 10 days. Timely completion awards a cohort-specific NFT, while later completion grants an "Eternal" NFT for the course.

### NFT Certificates
Upon completing our courses, students are awarded unique NFT certificates. These digital certificates serve as a modern testament to your achievement and can be prominently displayed on professional networks like LinkedIn.

![Linkedin Certificates](public/linkedin_certificates.png)

### Key Features of the NFT Certificates:

* Limited Traits: Each NFT certificate contains only three specific traits: the course name, the cohort, and the student's completion number. This tailored approach highlights the personalized journey of each learner.

* Dynamic SVG on Blockchain: The certificate is a dynamic SVG file stored directly on the blockchain. This innovative format allows for the certificate to evolve; new courses can be added simply by updating the aforementioned fields.

![NFT Example](public/nft_image.svg)

In the sample above, "ETERNOS" denotes the cohort, and the course title, in this instance, "SoliditySmartContract", is dynamically generated. This ensures that each certificate is not only a symbol of personal accomplishment but also a piece of art tailored to the individual's learning path.

## Multi-Language Support and Open-Source Content

Our platform is inclusive, supporting multi-language content to cater to a global audience. All course materials are open-source, accessible through markdown files in the `web3dev-version` branch of our [GitHub repository](https://github.com/w3b3d3v/buildspace-projects/tree/web3dev-version).

# How To Contribute

## Requirements

### Node.js
- Ensure that you have Node.js version 20 installed on your system. You can download it from [Node.js official website](https://nodejs.org/).

### Firebase CLI
- To manage Firebase services and deploy to Firebase Hosting, you need to install the Firebase CLI. Run the following command to install the latest version of `firebase-tools`:
  ```bash
  npm install -g firebase-tools
  ```

## Environment Setup
- Copy the contents of `.env.example` to `.env`.
- Environment variables such as Discord and GitHub tokens will be granted only for frequent contributors. The application can work without these variables set, but capabilities will be limited.

## Getting Started

1. Fork the repository by clicking the "Fork" button on the GitHub page.
2. Clone your forked repository:
    ```bash
    git clone https://github.com/<your-github-username>/web3-bootcamp-platform.git
    cd web3-bootcamp-platform
    ```

3. Install dependencies:
    ```bash
    yarn install
    ```

4. Start the Firebase emulator:
    ```bash
    yarn emulators:start
    ```

5. Seed data to the local database, open a new terminal and run:
    ```bash
    yarn seed-data
    ```

6. Run the development server:
    ```bash
    yarn dev
    ```

Open http://localhost:3000 with your favorite browser to see your project.

### Deploy to production

You can see the results locally in production mode with:

```
$ yarn build
$ yarn start
```

The generated HTML and CSS files are minified (built-in feature from Next js). It will also removed unused CSS from [Tailwind CSS](https://tailwindcss.com).

Now, the plataform is ready to be deployed. All generated files are located at `build` folder, which you can deploy with any hosting service.

### Deploy to Vercel

Deploy this project on Vercel in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/w3b3d3v/web3-bootcamp-platform)

## Contributions

Everyone is welcome to contribute to this project. Feel free to open an issue if you have a question or find a bug.

- **Find Tasks and Issues**: You can view all tasks and issues on our [Kanban board](https://github.com/orgs/w3b3d3v/projects/28/views/5). This is where we track ongoing work and plan future developments.

- **Weekly Meetings**: We host a weekly meeting of contributors every Tuesday at 7:30 PM (Brazil Time, GMT-3) in our Discord server. Join us in the "Team Room" voice channel to discuss ongoing projects and brainstorm new ideas. [Join the meeting on Discord](https://discord.gg/qmbKqcd3).

For more information on how to contribute, join our Discord community: [Join Discord](https://pt.discord.w3d.community/).


### License

Licensed under the MIT License, Copyright © 2022

See [LICENSE](LICENSE) for more information.

---

Made with ♥ by [web3dev](https://links.w3d.community) 
