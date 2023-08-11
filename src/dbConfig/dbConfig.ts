import mongoose from 'mongoose';

const connect = async () => {
  try {
    mongoose.connect(process.env.DATABASE!);

    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('DB connection successful ✅');
    });

    connection.on('error', (err) => {
      console.log('DB connection error 🔥 ' + err);

      process.exit();
    });
  } catch (err) {
    console.log('💥 Something went wrong!');
    console.log(err);
  }
};

export default connect;
