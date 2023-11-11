# Comment publier un composant React sur NPM

## 0. Prérequis

Pour cet exemple, je vais partir du principe que l'on dispose d'un compte `Github`, que l'on connait les bases du `terminal`,
de `git` et de `React`, enfin `nodejs` doit également être installé sur votre machine.

## 1. Créer un compte sur NPM

Se créer un compte nom  sur [npmjs](https://www.npmjs.com/) et s'y connecter. Il est également possible de s'y connecter directement depuis le terminal avec
la commande `npm login`

## 2. Créer un projet React

Créer un projet React avec la commande `npx create-react-app nom-du-projet`, se déplacer dans le dossier nouvellement
créé avec `cd nom-du-projet` puis lancer le serveur avec `npm start` pour vérifier que tout fonctionne correctement.

## 3. Modification de la structure du projet

Pour publier un composant React sur NPM, il faut que le projet soit sous forme de librairie.<br /> Pour cela, il faut modifier
la structure du projet et nous allons créer un premier composant `modal`.

**Voici un exemple de structure modifiée :**

    ```
    ├── .gitignore
    ├── package.json
    ├── README.md
    ├── src
    │   ├── index.js
    │   ├── app.js
    │   ├── lib
    │   │   ├── index.js
    │   │   ├── components
    │   │   │   ├── modal
    │   │   │   │   ├── index.js
    │   └── └── └── └── modal.css
    ├── public 
    └── └── index.html
    ```

> Note : Le dossier `public`ainsi que les fichiers `src/index.js` et `src/app.js` vont uniquement nous servir à tester notre
composant pour le moment.

## 4. Création du composant

Dans le dossier `src/lib/components/modal` créer un fichier `index.js` et y ajouter le code suivant :

    ```javascript
    import React from 'react';
    import './modal.css';

    const Modal = () => {
        return (
            <div className="modal">
                <h1>Modal</h1>
            </div>
        );
    };

    export default Modal;
    ```

Pour la partie design du composant, dans le dossier `src/lib/components/modal` créer un fichier `modal.css` et y ajouter
le code suivant :

    ```javascript
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ```

## 5. Création du fichier d'entrée de la librairie

Dans le dossier `src/lib` créer un fichier `index.js` et y ajouter le code suivant :

    ```javascript
    import Modal from './components/modal';

    export { Modal };
    ```

Ce code nour permettra d'accéder au composant `Modal` depuis l'extérieur de la librairie dans les projets qui
utiliserons cette librairie.

## 6. Installation des dépendances

Installer les dépendances suivantes pour nous permettre la compilation de notre librarie:

    ```javascript
        npm install --save-dev @babel/core @babel/cli @babel/preset-env
        npm install -save @babel/polyfill
    ```


## 7. Création du fichier babel.config.json

Créer un fichier `babel.config.json` et y ajouter le code suivant :

    ```javascript
    {
        "presets": [
            [
                "@babel/env",
                {
                    "targets": {
                        "edge": "17",
                        "firefox": "60",
                        "chrome": "67",
                        "safari": "11.1"
                    },
                    "useBuiltIns": "usage",
                    "corejs": "3.6.5"
                }
            ],
            "@babel/preset-react"
        ]
    }
    ```

> Note : Cette configuration sera utilisée par babel pour permettre la compilation des fichiers sources


## 8. Modification du fichier package.json

Modifier la partie `scripts` pour y ajouter la commande de build :

    ```javascript
    "scripts": {
        "start": "react-scripts start",
        "build": "rm -rf dist && NODE_ENV=production babel src/lib --out-dir dist --copy-files"
    },
    ```

> Note : Cette commande nous permettra de compiler notre librairie dans le dossier `dist` avec la commande `npm run build`.



Nous pouvons également modifier la partie description du projet dans ce même fichier : 

    ```javascript
        "name": "nom-de-votre-librairie",
        "version": "0.0.1",
        "private": false,
        "description": "Description de que fera votre librarie ?",
        "author": "Votre nom",
        "keywords": ["react", "components", "ui"],
        "main": "dist/index.js",
        "module": "dist/index.js",
        "files": [ "dist", "README.md" ],
        "repository": {
            "type": "git",
            "url": "git+VOTRE_ADRESSE_GITHUB"
        },
    ```

> Note : Exemple de format d'adresse Github : `git+https://github.com/wmalbos/react-minimalist-ui.git
## 9. Publication de la librairie

Avant toute publication, penser à recompiler les fichiers sources avec `npm run build` le dossier `dist`.<br/>
Pour publier la librairie, il faut se connecter à son compte NPM avec la commande `npm login` puis publier la librairie avec la commande `npm publish`.


> **Important : Avant chaque publication, ne pas oublier de refaire la compilation avec `npm run build` et d'incrémenter le compteur de `version` dans le fichier `package.json` sinon npm ne prendra pas en compte les modifications.** 


## 10. Utilisation de la librairie

Pour utiliser la librairie dans un projet, il faut l'installer avec la commande `npm install nom-de-votre-librairie` (*elle dépendra du nom de votre propre librarie que vous avez mis dans le fichier package.json*) puis importer le composant `Modal` avec la commande `import { Modal } from 'nom-de-votre-librairie';` et l'utiliser dans le code JSX avec `<Modal />`. 

> Informations : Si l'import du composant ne fonctionne, pas vous avez probablement oublié le fichier `src/lib/index.js`qui permet l'export du composant en dehors de la librairie.