import app from './app';
import { prisma } from './prismaClient';

async function main() {
  const weatherData = await prisma.weatherData.findMany();
  console.log(weatherData);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
