/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface GoalContractInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addVerifier"
      | "canWithdraw"
      | "goalAmount"
      | "goalOwner"
      | "goalToken"
      | "hasVerified"
      | "markGoalAchieved"
      | "participant"
      | "participate"
      | "reset"
      | "verifier"
      | "withdrawTokens"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addVerifier",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "canWithdraw",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "goalAmount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "goalOwner", values?: undefined): string;
  encodeFunctionData(functionFragment: "goalToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "hasVerified",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "markGoalAchieved",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "participant",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "participate",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "reset", values?: undefined): string;
  encodeFunctionData(functionFragment: "verifier", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawTokens",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "addVerifier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "canWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "goalAmount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "goalOwner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "goalToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hasVerified",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "markGoalAchieved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "participant",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "participate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "reset", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "verifier", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawTokens",
    data: BytesLike
  ): Result;
}

export interface GoalContract extends BaseContract {
  connect(runner?: ContractRunner | null): GoalContract;
  waitForDeployment(): Promise<this>;

  interface: GoalContractInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addVerifier: TypedContractMethod<
    [_verifier: AddressLike],
    [void],
    "nonpayable"
  >;

  canWithdraw: TypedContractMethod<[], [boolean], "view">;

  goalAmount: TypedContractMethod<[], [bigint], "view">;

  goalOwner: TypedContractMethod<[], [string], "view">;

  goalToken: TypedContractMethod<[], [string], "view">;

  hasVerified: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  markGoalAchieved: TypedContractMethod<[], [void], "nonpayable">;

  participant: TypedContractMethod<[], [string], "view">;

  participate: TypedContractMethod<
    [amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  reset: TypedContractMethod<[], [void], "nonpayable">;

  verifier: TypedContractMethod<[], [string], "view">;

  withdrawTokens: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addVerifier"
  ): TypedContractMethod<[_verifier: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "canWithdraw"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "goalAmount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "goalOwner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "goalToken"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "hasVerified"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "markGoalAchieved"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "participant"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "participate"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "reset"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "verifier"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "withdrawTokens"
  ): TypedContractMethod<[], [void], "nonpayable">;

  filters: {};
}
