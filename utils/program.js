import { AnchorProvider, BN, Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

import { PROGRAM_ID } from "./constants";

export const getProgram = (connection, wallet) => {
  const IDL = require("./idl.json");
  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  );
  const program = new Program(IDL, PROGRAM_ID, provider);
  return program;
};

export const getUserAccountPk = async (owner) => {
  return (
    await PublicKey.findProgramAddress(
      [Buffer.from("user"), owner.toBuffer()],
      PROGRAM_ID
    )
  )[0];
};

export const getPostAccountPk = async (owner, id) => {
  return (
    await PublicKey.findProgramAddress(
      [
        Buffer.from("post"),
        owner.toBuffer(),
        new BN(id).toArrayLike(Buffer, "le", 8),
      ],
      PROGRAM_ID
    )
  )[0];
};

export const getLikeAccountPk = async (owner, id, liker) => {
  return (
    await PublicKey.findProgramAddress(
      [
        Buffer.from("like"),
        owner.toBuffer(),
        new BN(id).toArrayLike(Buffer, "le", 8),
        liker.toBuffer(),
      ],
      PROGRAM_ID
    )
  )[0];
};
