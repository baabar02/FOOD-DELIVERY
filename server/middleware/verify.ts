import router from "express";

export const TokenCheker = async(
  "/verify",
  (request: Request, response: Response) => {
    const { token } = request.body;

    const tokenPassword = "foodDelivery";

    const isValid = jwt.verify(token, tokenPassword);

    try {
      const destructToken = jwt.decode(token);

      if (isValid) {
        const destructToken = jwt.decode(token);
        response.send({ destructToken });
        return;
      } else {
        response.status(401).send({ message: "token is not valid" });
        return;
      }
    } catch (err) {
      response.status(401).send({ message: "token is not valid" });
      return;
    }
  }
);

app.post(
  "/resend-verification",
  async (request: Request, response: Response) => {
    const { email } = request.body;
    if (!email) {
      response.status(400).send({ message: "Email is required" });
      return;
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      response.status(400).send({ message: "User does not exist" });
      return;
    }
    response.send({ message: "Verification email resent" });
  }
);
