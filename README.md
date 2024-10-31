the backend still on this github account called My-Store

add .env.local file on the front end and add the following: NEXTAUTH_URL=http://localhost:3001 (the port your front end is running on) NEXTAUTH_SECRET=(generate a random secret key)

NEXT_PUBLIC_BASE_URL=http://localhost:3000 (the port your backend is running on or the backend endpoint)

NEXT_PUBLIC_PRODUCTS_URL=${NEXT_PUBLIC_BASE_URL}/api/products NEXT_PUBLIC_USERS_URL=${NEXT_PUBLIC_BASE_URL}/api/users NEXT_PUBLIC_ORDERS_URL=${NEXT_PUBLIC_BASE_URL}/api/orders NEXT_PUBLIC_PROFILE_UPLOADER_URL=${NEXT_PUBLIC_BASE_URL}/uploader NEXT_PUBLIC_PROFILE_UPLOAD_URL=${NEXT_PUBLIC_BASE_URL}/upload

NEXT_PUBLIC_PRODUCT_IMAGES_UPLOADER_URL=${NEXT_PUBLIC_BASE_URL}/uploadProducts

NEXT_PUBLIC_BASE_URL_FOR_ADMIN=${NEXT_PUBLIC_BASE_URL}/api

dont run the frontend before running the backend to ensure the database is available when frontend runs
