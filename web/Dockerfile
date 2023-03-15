FROM node:16
#set current directory
WORKDIR /opt/web/
#copy installation packages file
COPY package*.json ./
#install the packages
RUN npm install 
#copy the source  code
COPY ./ ./
#the listening PORT
ENV PORT=80
ENV PATH /opt/web/node_modules/.bin:$PATH
EXPOSE 80
EXPOSE 8080
#start the app
CMD npm start
#CMD ng serve