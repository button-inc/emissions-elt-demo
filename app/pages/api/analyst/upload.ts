import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
/*
// 👉️ import the Google Cloud client library
import { Storage } from "@google-cloud/storage";
// 👉️ import formdata parser library
import multer from "multer";
import { Readable } from "stream";

// 📌 IMPORTANT: prevent next from trying to parse the form
export const config = {
  api: {
    bodyParser: false,
  },
};

// 👇️ persist file to GCS bucket
async function saveFormData(file) {
  //📌 IMPORTANT:
  // The client libraries support Application Default Credentials (ADC)
  // So, no need to explicitly authenticate or manage tokens; these requirements are managed automatically by the authentication libraries.
  //To set up ADC se: : https://cloud.google.com/docs/authentication/provide-credentials-adc
  // 1. Create a service account with the roles our application needs, and a key for that service account
  // 2. Set the environment variable GOOGLE_APPLICATION_CREDENTIALS to the (external to the project) path of the JSON file that contains your service account key.
  //Linux or macOS CLI
  // export GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"
  // Windows
  // $env:GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"
  // Replace KEY_PATH with the path of the JSON file that contains your service account key.
  //Note: this environment variable only applies to your current shell session, so if you open a new session, set the variable again.
  const storage = new Storage({
    projectId: process.env.GOOGLE_PROJECT_NAME,
  });
  // 👇️ GCS bucket
  const bucket = storage.bucket(process.env.GOOGLE_BUCKET_NAME);

  //check connection
  // storage.getBuckets().then((x) => console.log(x));

  // 👇️ create stream
  const readStream = Readable.from(file.buffer);
  await new Promise((res) =>
    readStream
      .pipe(
        bucket.file(file.originalname).createWriteStream({
          resumable: true,
          gzip: false,
        })
      )
      .on("finish", res)
  );
}

// 👇️ parse the request's formdata object
async function parseFormData(
  req: NextApiRequest & { files?: any },
  res: NextApiResponse
) {
  const storage = multer.memoryStorage();
  const multerUpload = multer({ storage });
  const multerFiles = multerUpload.any();
  await new Promise((resolve, reject) => {
    multerFiles(req as any, res as any, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
  return {
    fields: req.body,
    files: req.files,
  };
}

// 👉️ req: An instance of http.IncomingMessage, plus some pre-built middlewares
// 👉️ res: An instance of http.ServerResponse, plus some helper functions
const handler: NextApiHandler = async (req, res) => {
  const requestMethod = req.method;

  switch (requestMethod) {
    case "POST":
      try {
        const formData = await parseFormData(req, res);

        try {
          await saveFormData(formData.files[0]);
          res.status(200).send({ message: "submitted" });
          return;
        } catch (e) {
          res.status(500).send({ message: "something went wrong" });
          return;
        }
      } catch (e) {
        res.status(400).send({ message: "invalid submission" });
        return;
      }
    default:
      res.status(200).json({ message: "Welcome to API Routes!" });
  }
};
*/

//TO DO: COMPLETE CODE ABOVE- SETUP ADC FOR local\container\GKE
const handler: NextApiHandler = async (req, res) => {
  res.status(200).json({ message: "WIP" });
};

export default handler;
