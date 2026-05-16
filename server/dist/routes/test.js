import { Router } from "express";
import { User } from "../models/User.js";
const router = Router();
// TEST ONLY — NEVER expose in production
if (process.env.NODE_ENV === "test") {
    router.delete("/user/:username", async (req, res) => {
        const { username } = req.params;
        await User.deleteOne({ username });
        // Always succeed — idempotent cleanup
        res.status(200).json({ message: "Test user reset" });
    });
}
export default router;
//# sourceMappingURL=test.js.map