# All:Chive

![Slide 16_9 - 116](https://github.com/Central-MakeUs/All-Chive-Mobile/assets/84809236/5e95eb42-115a-4e80-a07b-ca11ec5e1521)

링크부터 스크린샷까지 손쉽게 관리하고 큐레이션하는 아카이빙 서비스

### App Store

https://apps.apple.com/app/%EC%98%AC%EC%B9%B4%EC%9D%B4%EB%B8%8C-all-chive/id6462470996

### Google Play Store

https://play.google.com/store/apps/details?id=com.allchivemobile

## How to Start

### 1. 패키지 설치

```
yarn
```

### 2. Iterm 사용하는 경우

`node_modules/react-native/scripts/launchPackager.command` 의 실행 프로그램을 Iterm 으로 변경합니다.

### 3. AOS 애뮬레이터 실행

```
// dev
yarn android-dev
// production
yarn android-prod
```

### 4. IOS 애뮬레이터 실행

```
cd ios && pod install && cd ..
// dev
yarn ios-dev
// production
yarn ios-prod
```

## env setting

.env.dev / .env.prod 를 활용하여 빌드 환경을 분리합니다.

```
dev debug
prod debug
dev release
prod release
```

## Project Structure

```
	├─ ...
	├─ android	// Android project files.
	├─ ios		// iOS project files.
	├─ src
	│  ├─ apis/
	│  ├─ assets/		// Images assets.
	│  ├─ components/	// UI components.
	│  ├─ const/	// Constants.
	│  ├─ extensions/
	│  ├─ hooks/		// Custom hooks.
	│  ├─ locales/
	│  ├─ models/		// DTO type definitions.
	│  ├─ navigations/
	│  ├─ screens/
	│  ├─ services/
 	│  ├─ state/
	│  ├─ styles/		// Common styles.
	│  ├─ types/		// Type definitions
	├─ ...
```
