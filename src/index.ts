import { Request,  Response} from 'express';
import { app } from './app';


 const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello SW!');
});

app.listen(port, () => console.log(`Running on port ${port}`));
