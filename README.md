# To-do List

簡易的To-do List，能夠To-do的內容作出CRUD。

## Features - 產品功能

1. 使用者可以新增一筆 todo 並指定名稱
2. 使用者可以瀏覽全部 todo 清單，按名稱排序
3. 使用者可以查看特定 todo 的詳細資料
4. 使用者可以編輯一筆 todo 的名稱與完成狀態
5. 使用者可以刪除一筆 todo
6. 使用者可以使用Sample User做登入的動作

## Prerequisites - 系統需求

1. [Node.js] v14.15.1 (https://nodejs.org/en/)

## Installation - 安裝流程

1. Install [nvm] (https://github.com/nvm-sh/nvm) - 安裝nvm，nodejs的管理系統

2. Use [nvm] to install [nodejs] v14.15.1 - 利用nvm去安裝及使用nodejs ver.14.15.1
```
nvm install 14.15.1
nvm use 14.15.1
```

3. Install required package.  Change directory to project directory, then execute the following. - 在[Terminal]下切換到專案的資料夾，並執行以下command。
```
cd [project-folder-path]
npm install
```

4. Add Todo and User sample data. - 運行以下command，新增sample的todo以及user
```
npm run seed_todo
npm run seed_user
```

5. Start the web application, run the command below in terminal - 啟動專案，請在終端機執行以下指令
```
npm run start
```

6. Test login account can be found via /models/seeds/userSeeder.js - 在 /models/seeds/userSeeder.js 檔案中能夠找到測試用的User。

## Contributor

> [Thumper](https://github.com/thumperL)
