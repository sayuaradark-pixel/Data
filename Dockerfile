# Node.js 20 base image එක පාවිච්චි කරනවා
FROM node:20

# අවශ්‍ය System Libraries ඉන්ස්ටෝල් කිරීම (Sharp, Jimp, සහ Scrapers වලට මේවා අනිවාර්යයි)
RUN apt-get update && apt-get install -y \
    git \
    ffmpeg \
    imagemagick \
    libvips-dev \
    curl \
    && apt-get clean

# වැඩ කරන Directory එක හදනවා
WORKDIR /usr/src/app

# මුලින්ම package.json එක කොපි කරලා dependencies ඉන්ස්ටෝල් කරනවා
COPY package*.json ./
RUN npm install

# ඉතිරි සියලුම files කොපි කරනවා
COPY . .

# Hugging Face එක බලාපොරොත්තු වෙන PORT එක (Default 7860)
ENV PORT=7860
EXPOSE 7860

# බොට්ව ස්ටාර්ට් කරන විදිහ
CMD ["npm", "start"]