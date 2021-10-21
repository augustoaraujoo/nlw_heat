import { Request, Response } from 'express'
import { AuthenticateUserService } from '../services/AuthenticateUserService'
class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        const { code } = req.body;
        const service = new AuthenticateUserService();
        try {
            const result = await service.execute(code);
            return res.json(result);
        } catch (error) {
            return res.json(error.message);
        }
    }
}
export { AuthenticateUserController }