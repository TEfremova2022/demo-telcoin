FROM node:14
#set current directory
WORKDIR /opt/api/
#copy installation packages file
COPY package*.json ./
#install the packages
RUN npm install 
#copy the source  code
COPY ./ ./
#the listening PORT
ENV PORT=3000
EXPOSE 3000
#start the app
CMD npm start