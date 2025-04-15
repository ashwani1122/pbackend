import mongoose, { Document, Schema, ObjectId } from 'mongoose';

interface IAccount extends Document {
    balance: number;
    userId: ObjectId;
}

const accountSchema: Schema<IAccount> = new Schema({
    balance: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Account = mongoose.model<IAccount>('Account', accountSchema);

export default Account;  // Correct export      
