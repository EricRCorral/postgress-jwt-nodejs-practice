import APP from "./app";

const PORT = process.env.PORT || 8000;

APP.listen(PORT, () => {
  console.log(`Listen to port: ${PORT}`);
});
