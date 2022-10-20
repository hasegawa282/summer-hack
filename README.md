# 概要

<!-- TODO:[image] -->

保育園における出欠管理システム

## 主な機能

[保護者]

-   保護者の出欠登録
-   保育士からの返信閲覧

[保育士]

-   園児の出席閲覧
-   欠席した園児の保護者への返信

# 使用技術

<!-- TODO:画像の追加 -->

## フロントエンド

-   React@18.0.17
-   TypeScript@4.7.4
-   blueprintjs/core@4.6.0

## バックエンド

-   Python@3.10
-   Django@3.2.10
-   Django REST API@3.13.1
-   SQLite

# 開発環境構築

## フロントエンド

### 開発環境構築手順

1. node.js をインストールする  
   [node.js の Download リンク](https://nodejs.org/ja/download/)

2. mkdir/cd で作業フォルダを作成・移動し, git pull  
   `git clone https://github.com/ing08/biprogy-summer-2022.git`

3. package.json があるフォルダで npm install を使って, 必要なパッケージを取得  
   `npm install`

4. npm start で開発用サーバーの立ち上げ [http://localhost:3000]  
   `npm start`

### デプロイ方法

1. cdk フォルダ内の deploy.sh の実行

### 各種フォルダの注意点

-   保護者用と保育士用で 2 つ package.json が存在するのでそれぞれで npm install する必要がある
-   atomicDesign の使用

## バックエンド

### 開発環境構築手順

1. python3.10 をインストールする (pipenv 等でも ok)

2. django をインストール  
   `pip install django`

3. 各種パッケージをインストール  
`pip install django-rest-api`  
`pip install django-rest-multiple-models`
`pip install django-cors-headers`
 <!-- TODO:必要なパッケージの追加 -->

4. データの migrate  
   `python manage.py migrate`

5. superuser の登録  
   `python manage.py createsuperuser`  
   (必要な情報を入力)

6. 開発用サーバーの立ち上げ  
   `python manage.py runserver`

### デプロイ方法

-   デプロイ先の DB
    -   MySQL@8.0.25

<img src="./img/class_api.png" width="100%">

### データのセットアップ方法
