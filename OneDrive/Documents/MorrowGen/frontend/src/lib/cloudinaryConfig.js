import cloudinary from 'cloudinary'
cloudinary.v2.config({
  cloud_name: 'dxbeg10cj',
  api_key: '674351868578557',
  api_secret: '<your_api_secret>',
  secure: true,
});

export default cloudinary