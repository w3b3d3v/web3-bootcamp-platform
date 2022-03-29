### Plataform Bootcamp 

Web3 learning platform through bootcamps


### Requirements

- Node.js 14 and yarn
- Firebase [Authentication](https://firebase.google.com/docs/auth) and [Firestore](https://firebase.google.com/docs/firestore)

### Getting started

Run the following command on your local environment:

```
git clone https://github.com/w3b3d3v/web3-bootcamp-platform.git web3-bootcamp-plataform
cd web3-bootcamp-plataform
yarn install
```

Then, you can run locally in development mode with live reload:

```
yarn run dev
```

Open http://localhost:3000 with your favorite browser to see your project.

```
.
├── README.md                # README file
├── next.config.js           # Next JS configuration
├── public                   # Public folder
│   └── assets
│       └── img              # Image used by default template
├── components               # Atomic layout components
├── context                  # Context 
├── firebase                 # Firebase configuration
├── hooks                    # Hooks
├── lib                      # Content library
├── pages                    # Next JS pages
├── styles                   # PostCSS style folder with Tailwind
├── .env.example             #  ENV example file
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
└── tsconfig.json            # TypeScript configuration
```


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

### Contributions

Everyone is welcome to contribute to this project. Feel free to open an issue if you have question or found a bug.
For more information on how to contribute join our Discord https://discord.web3dev.com.br/

### License

Licensed under the MIT License, Copyright © 2022

See [LICENSE](LICENSE) for more information.

---

Made with ♥ by [web3dev](https://web3dev.com.br) 
