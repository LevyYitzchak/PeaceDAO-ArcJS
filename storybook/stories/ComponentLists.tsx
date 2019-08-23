import * as React from "react";
import { storiesOf } from "@storybook/react";
import {
  Arc,
  DevArcConfig as arcConfig,
  DAOs,
  DAO,
  DAOData,
  Members,
  Member,
  MemberData,
  Proposal,
  Proposals,
  ProposalData,
  Reputations,
  Reputation,
  ReputationData,
  Tokens,
  Token,
  TokenData,
  Rewards,
  Reward,
  RewardData,
  Schemes,
  Scheme,
  SchemeData,
  Stakes,
  Stake,
  StakeData,
  Votes,
  Vote,
  VoteData
} from "../../src/";
import ComponentListView, { PropertyType, PropertyData } from "../helpers/ComponentListView";

const DAOProp: PropertyData = {
  friendlyName: "DAO Address",
  name: "dao",
  defaultValue: "0xe7a2c59e134ee81d4035ae6db2254f79308e334f",
  type: PropertyType.string
};

const MemberProp: PropertyData = {
  friendlyName: "Member Address",
  name: "member",
  defaultValue: "0xe7a2c59e134ee81d4035ae6db2254f79308e334f",
  type: PropertyType.string
};

const ProposalProp: PropertyData = {
  friendlyName: "Proposal ID",
  name: "proposal",
  defaultValue: "",
  type: PropertyType.string
};

const TokenProp: PropertyData = {
  friendlyName: "Token Address",
  name: "token",
  defaultValue: "",
  type: PropertyType.string
};

export default () =>
  storiesOf("Component Lists", module)
    .add("DAOs", () => (
      <ComponentListView
        name={"DAOs"}
        ComponentListType={DAOs}
        ComponentType={DAO}
        ProtocolType={Arc}
        protocolConfig={arcConfig}
        propEditors={[]}
        getId={(dao: DAOData) => `DAO: ${dao.address}`}
      />
    ))
    .add("Members", () => (
      <ComponentListView
        name={"Members"}
        ComponentListType={Members}
        ComponentType={Member}
        ProtocolType={Arc}
        protocolConfig={arcConfig}
        scopes={["DAO"]}
        AddedContext={(props) => (
          <DAO address={props.dao}>
          {props.children}
          </DAO>
        )}
        propEditors={[DAOProp]}
        getId={(member: MemberData) => `Member: ${member.address}`}
      />
    ))
    .add("Proposals", () => (
      <ComponentListView
        name={"Proposals"}
        ComponentListType={Proposals}
        ComponentType={Proposal}
        ProtocolType={Arc}
        protocolConfig={arcConfig}
        scopes={["DAO", "Member as proposer"]}
        AddedContext={(props) => (
          <DAO address={props.dao}>
            <Member address={props.member}>
            {props.children}
            </Member>
          </DAO>
        )}
        propEditors={[DAOProp, MemberProp]}
        getId={(proposal: ProposalData) => `Proposal: ${proposal.id}`}
      />
    ))
    .add("Reputations", () => (
      <ComponentListView
        name={"Reputations"}
        ComponentListType={Reputations}
        ComponentType={Reputation}
        ProtocolType={Arc}
        protocolConfig={arcConfig}
        propEditors={[]}
        getId={(reputation: ReputationData) => `Reputation: ${reputation.address}`}
      />
    ))
    .add("Rewards", () => (
      <ComponentListView
        name={"Rewards"}
        ComponentListType={Rewards}
        ComponentType={Reward}
        ProtocolType={Arc}
        protocolConfig={arcConfig}
        scopes={["DAO", "Member as beneficiary", "Proposal", "Token"]}
        AddedContext={(props) => (
          <DAO address={props.dao}>
            <Member address={props.member}>
              <Proposal id={props.proposal}>
                <Token address={props.token}>
                {props.children}
                </Token>
              </Proposal>
            </Member>
          </DAO>
        )}
        propEditors={[DAOProp, MemberProp, ProposalProp, TokenProp]}
        getId={(reward: RewardData) => `Reward: ${reward.id}`}
      />
    ))
    .add("Schemes", () => (
      <ComponentListView
        name={"Schemes"}
        ComponentListType={Schemes}
        ComponentType={Scheme}
        ProtocolType={Arc}
        protocolConfig={arcConfig}
        scopes={["DAO"]}
        AddedContext={(props) => (
          <DAO address={props.dao}>
          {props.children}
          </DAO>
        )}
        propEditors={[DAOProp]}
        getId={(scheme: SchemeData) => `Scheme (${scheme.name}): ${scheme.id}`}
      />
    ))
    .add("Stakes", () => (
      <ComponentListView
        name={"Stakes"}
        ComponentListType={Stakes}
        ComponentType={Stake}
        ProtocolType={Arc}
        protocolConfig={arcConfig}
        scopes={["DAO", "Member as staker", "Proposal"]}
        AddedContext={(props) => (
          <DAO address={props.dao}>
            <Member address={props.member}>
              <Proposal id={props.proposal}>
              {props.children}
              </Proposal>
            </Member>
          </DAO>
        )}
        propEditors={[DAOProp, MemberProp, ProposalProp]}
        getId={(stake: StakeData) => `Stake: ${stake.id}`}
      />
    ))
    .add("Tokens", () => (
      <ComponentListView
        name={"Tokens"}
        ComponentListType={Tokens}
        ComponentType={Token}
        ProtocolType={Arc}
        protocolConfig={arcConfig}
        propEditors={[]}
        getId={(token: TokenData) => `Token (${token.name} - ${token.symbol}): ${token.address}`}
      />
    ))
    .add("Votes", () => (
      <ComponentListView
        name={"Votes"}
        ComponentListType={Votes}
        ComponentType={Vote}
        ProtocolType={Arc}
        protocolConfig={arcConfig}
        scopes={["DAO", "Member as voter", "Proposal"]}
        AddedContext={(props) => (
          <DAO address={props.dao}>
            <Member address={props.member}>
              <Proposal id={props.proposal}>
              {props.children}
              </Proposal>
            </Member>
          </DAO>
        )}
        propEditors={[DAOProp, MemberProp, ProposalProp]}
        getId={(vote: VoteData) => `Vote: ${vote.id}`}
      />
    ));
