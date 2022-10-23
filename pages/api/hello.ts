import { NextApiRequest, NextApiResponse } from 'next'

type ResponseType = {
  text: 'hi world'
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  res.status(200).json({
    text: 'hi world',
  })
}
