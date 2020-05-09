import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import {
  Arc,
  ArcConfig,
  PluginData,
  ProposalData,
  Proposal,
  Plugin,
  PluginManager,
  PluginManagerProposal,
} from "../../src";

const arcConfig = new ArcConfig("private");
const pluginId =
  "0xb262e81d24322258466af958b36d67ad867be64f526ed13dd3af38e13094a829";
const proposalId =
  "0x1a691b748985f728ff512ea51498ba2459498312c57acd4536e2c14ae350d9e1";

describe("Plugin manaer component ", () => {
  afterEach(() => cleanup());

  it("Shows plugin name", async () => {
    const { container } = render(
      <Arc config={arcConfig}>
        <PluginManager id={pluginId}>
          <PluginManager.Data>
            {(plugin: PluginData) => <div>{"Plugin name: " + plugin.name}</div>}
          </PluginManager.Data>
        </PluginManager>
      </Arc>
    );

    const name = await screen.findByText(/Plugin name:/);
    expect(name).toBeInTheDocument();
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Plugin name: SchemeRegistrar
      </div>
    `);
  });

  it("Works with inferred plugin", async () => {
    const { container } = render(
      <Arc config={arcConfig}>
        <Plugin id={pluginId}>
          <PluginManager>
            <PluginManager.Data>
              {(plugin: PluginData) => (
                <div>{"Plugin name: " + plugin.name}</div>
              )}
            </PluginManager.Data>
          </PluginManager>
        </Plugin>
      </Arc>
    );

    const name = await screen.findByText(/Plugin name:/);
    expect(name).toBeInTheDocument();
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Plugin name: SchemeRegistrar
      </div>
    `);
  });
});

describe("Proposal component ", () => {
  afterEach(() => cleanup());

  it("Shows proposal id", async () => {
    const { container } = render(
      <Arc config={arcConfig}>
        <PluginManagerProposal id={proposalId}>
          <PluginManagerProposal.Data>
            {(proposal: ProposalData) => (
              <div>{"Proposal id: " + proposal.id}</div>
            )}
          </PluginManagerProposal.Data>
        </PluginManagerProposal>
      </Arc>
    );

    const name = await screen.findByText(/Proposal id:/);
    expect(name).toBeInTheDocument();
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Proposal id: ${proposalId}
      </div>
    `);
  });

  it("Works with inferred proposal", async () => {
    const { container } = render(
      <Arc config={arcConfig}>
        <Proposal id={proposalId}>
          <PluginManagerProposal>
            <PluginManagerProposal.Data>
              {(proposal: ProposalData) => (
                <div>{"Proposal id: " + proposal.id}</div>
              )}
            </PluginManagerProposal.Data>
          </PluginManagerProposal>
        </Proposal>
      </Arc>
    );

    const name = await screen.findByText(/Proposal id:/);
    expect(name).toBeInTheDocument();
    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        Proposal id: ${proposalId}
      </div>
    `);
  });
});
