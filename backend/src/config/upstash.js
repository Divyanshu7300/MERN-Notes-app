import dotenv from "dotenv";
dotenv.config();

import { Redis } from "@upstash/redis";
import { Ratelimit} from "@upstash/ratelimit";



const ratelimit = new Ratelimit({
  redis:Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "5 s"),
});


export default ratelimit;
