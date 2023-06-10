// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    let pincodes ={
      "754293":["Nemalo","Odisha"],
      "754202":["Salipur","Odisha"],
      "752050":["Jatni","Odisha"],
      "754207":["N.koili","Odisha"],
    }
    res.status(200).json(pincodes);
  }
  