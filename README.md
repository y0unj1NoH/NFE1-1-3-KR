# 🔗[📚KR](https://koreareads.netlify.app/)

<div align=center>

[![KR](https://github.com/user-attachments/assets/8c730074-8f97-480f-a2ab-2bea2c124888)](https://koreareads.netlify.app/)

외국인들에게 한국 도서를 소개하고, 각 작품에 대한 정보와 문화적 배경을 공유할 수 있는 **인터랙티브한 한국 도서 커뮤니티 사이트**입니다

</div>

### Contents

👀 [Project Overview](#%f0%9f%91%80-project-overview) <br />
👥 [Member](#%f0%9f%91%a5-member) <br />
✨ [Features](#%e2%9c%a8-features) <br />
📂 [Project Structure](#%f0%9f%93%82-project-structure) <br />
🛠️ [Tech Stack](#%f0%9f%9b%a0%ef%b8%8f-tech-stack) <br />
🚀 [Future Roadmap](#%f0%9f%9a%80-future-roadmap) <br />

---

## 👀 Project Overview

최근 한강 작가님의 노벨 문학상 수상으로 한국 문학에 대한 세계적인 관심이 크게 높아졌습니다. 하지만 외국인들이 한국 도서를 쉽게 접할 수 있는 공간은 아직 부족한 상황입니다.

그래서 외국인들에게 한국 도서를 소개하고, 각 작품에 대한 정보와 문화적 배경을 공유할 수 있는 **인터랙티브한 한국 도서 커뮤니티 사이트**를 제공하고자 합니다.

이 플랫폼을 통해 한국 문학을 더 많은 사람들에게 알리는 동시에, 독자들이 서로의 독서 경험을 나누는 공간이 될 것입니다.
<br />
<br />
With the recent Nobel Prize in Literature awarded to South Korean author Han Kang, there has been a surge in global interest in Korean literature. However, resources for international readers to access and explore Korean books remain limited.

To bridge this gap, we aim to create **an interactive Korean book community platform** designed to introduce Korean literature to a global audience. This platform will provide detailed information about various Korean works, including cultural backgrounds and context, to enrich readers' understanding and appreciation.

Through this platform, we hope to promote Korean literature to a wider audience and create a space for readers to share their experiences and insights on Korean books.

## 👥 Member

<div align=center>

| <img src="https://github.com/CH4MD0M.png" width="80"> | <img src="https://github.com/y0unj1NoH.png" width="80"> | <img src="https://github.com/he2e2.png" width="80"> | <img src="https://github.com/hoon-hoon.png" width="80"> |
| :---------------------------------------------------: | :-----------------------------------------------------: | :-------------------------------------------------: | :-----------------------------------------------------: |
|         [노기훈](https://github.com/CH4MD0M)          |         [노윤지](https://github.com/y0unj1NoH)          |         [조희정](https://github.com/he2e2)          |          [최훈](https://github.com/hoon-hoon)           |

</div>

## ✨ Features

- **베스트 셀러 도서 조회**
  - [알라딘 OpenAPI](https://blog.aladin.co.kr/openapi)에서 제공하는 베스트 셀러 도서 목록을 인터랙티브한 슬라이더 형태로 제공합니다.
- **도서 검색**
  - 상단 메뉴에서 도서 제목 및 작가 이름 기반 검색 기능을 제공합니다.
- **도서 상세 정보 조회**
  - 영문으로 도서의 상세 정보를 제공하며 로그인한 사용자는 북마크를 통해 도서를 저장할 수 있습니다.
- **커뮤니티**
  - 도서에 대한 한 줄 평을 기록하고 타 사용자와 공유하는 커뮤니티를 제공합니다. 사용자는 타 사용자와 좋아요와 댓글을 통해 소통할 수 있습니다.
- **마이 페이지**
  - 사용자 정보와 북마크 도서, 작성 게시 물, 댓글을 확인할 수 있습니다.

<img src="https://github.com/user-attachments/assets/ba90c22a-49f1-4346-a64d-6ed0f70ef571" width="45%" /> 
<img src="https://github.com/user-attachments/assets/79f1b943-1cc5-4b62-8f71-74d56f63239f" width="45%" /> 


## 📂 Project Structure

```
📦src
 ┣ 📂api
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┣ 📂layout
 ┣ 📂constants
 ┣ 📂context
 ┣ 📂hooks
 ┣ 📂lib
 ┣ 📂mocks
 ┣ 📂pages
 ┃ ┣ 📂community
 ┃ ┣ 📂home
 ┃ ┣ 📂modal
 ┃ ┣ 📂mypage
 ┣ 📂services
 ┣ 📂stores
 ┣ 📂styles
 ┣ 📂types
 ┣ 📂utils
 ┃
 ┣ 📜App.tsx
 ┣ 📜globals.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

## 🛠️ Tech Stack

<img  src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img  src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img  src="https://img.shields.io/badge/tailwind--css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img  src="https://img.shields.io/badge/react--router-CA4245?style=for-the-badge&logo=react router&logoColor=white"><br />
<img  src="https://img.shields.io/badge/zustand-FDC43E?style=for-the-badge&logo=zustand&logoColor=white"> <img  src="https://img.shields.io/badge/react--query-FF4154?style=for-the-badge&logo=react query&logoColor=white"> <img  src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white"> <img  src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img  src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">

## 🚀 Future Roadmap

- 도서 관련 음악 추천 서비스
- 작가 소개 서비스
- 작가 및 출판사의 인터뷰 영상
- 퀴즈를 통한 도서 추천
