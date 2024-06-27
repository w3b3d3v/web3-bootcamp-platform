# How To Contribute

## Requirements

### Node.js

- Ensure that you have Node.js version 20 installed on your system. You can download it from [Node.js official website](https://nodejs.org/).

### Firebase CLI

- To manage Firebase services and deploy to Firebase Hosting, you need to install the Firebase CLI. Run the following command to install the latest version of `firebase-tools`:
  ```bash
  npm install -g firebase-tools
  ```

### Java (OpenJDK)

- Java is required for certain build processes. Follow the instructions below to install OpenJDK on your system.
  > [!TIP]
  > Some members have successfully installed Java using this process: [Installing Java](#installing-java)

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
   yarn seed
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

### Installing Java

#### Mac

1. Install OpenJDK using Homebrew:
   ```bash
   brew install --cask temurin
   ```
2. Add the following lines to your shell configuration file (`~/.zshrc`, `~/.bashrc`, etc.) to set the `JAVA_HOME` and update the `PATH`:
   ```bash
   export JAVA_HOME=$(/usr/libexec/java_home)
   export PATH=$JAVA_HOME/bin:$PATH
   ```
3. Reload your shell configuration:
   ```bash
   source ~/.zshrc  # or source ~/.bashrc
   ```

#### Windows

1. Download and install Java from the official [Oracle website](https://www.java.com/en/download/ie_manual.jsp). Make sure to choose the version suitable for your system.
2. Open Command Prompt and set the `JAVA_HOME` environment variable:
   ```cmd
   set JAVA_HOME=C:\Program Files\Java\jdk-22
   ```
3. Add Java to your `PATH`:
   ```cmd
   set PATH=%JAVA_HOME%\bin;%PATH%
   ```
4. Restart Visual Studio Code or your development environment.

#### Linux

1. Install OpenJDK using your package manager:
   ```bash
   sudo apt install openjdk-22-jdk
   ```
2. Add the following lines to your shell configuration file (`~/.bashrc`, `~/.zshrc`, etc.) to set the `JAVA_HOME` and update the `PATH`:
   ```bash
   export JAVA_HOME=/usr/lib/jvm/java-19-openjdk-amd64
   export PATH=$JAVA_HOME/bin:$PATH
   ```
3. Reload your shell configuration:
   ```bash
   source ~/.bashrc  # or source ~/.zshrc
   ```
