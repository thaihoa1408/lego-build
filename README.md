# 🚀 Lego Build


## 📋 Table of Contents

- [LEOGO BUILD](#-lego-build)
  - [Installation](#-installation)
  - [Project structure](#-project-structure)
  - [Commands](#-commands)

## 📦 Installation

Clone the repository:

```bash
git clone http://gitlab.rockship.co/rockship/lego-build.git
```

Install dependencies:

```bash
npm install
```

## 📁 Project structure

```
📦 lego-build
├─ boilerplate                          # Contains codebase for react and next
│  ├─ next
│  └─ react
├─ node_modules
output                                  # contains output folder
├─ plop-templates                       # Define templates for common components,pages and routing
├─ package-lock.json
├─ package.json
└─ plopfile.js                          # Plop configuration file 
```
## 🛠️ Commands

Start to generate code, open CMD terminal and run these commands.

**Start generate:**

```bash
npm run generate start <framework>
# framework: react / next
```

**Generate react component:**

```bash
npm run generate react-component <json_string> 
#  json_string: "{\"name\": \"SigninForm\",\"title\": \"Login\"}"
```

**Generate react page:**

```bash
npm run generate react-page <json_string>
# json_string: "{\"name\": \"SigninPage\",\"path\":\"/signin\"}"
```