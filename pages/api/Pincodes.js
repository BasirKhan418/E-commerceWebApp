// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    let pincodes ={
      "754293":["cuttack","Odisha"],
      "754202":["cuttack","Odisha"],
      "752050":["khurda","Odisha"],
      "754207":["N.koili","Odisha"],
    }
    res.status(200).json(pincodes);
  }
  