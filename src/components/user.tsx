import NFTs from "@/components/nfts";
import Transfer from "@/components/transfer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import CopyField from "@/components/copy-field";
import Mint from "@/components/mint";
import CreateTransfer from "@/components/create-transfer";
import AcceptTransfer from "@/components/accept-transfer";

type UserProps = {
  name: string;
  mint?: boolean;
  seed: string;
  previous: string;
  address: string;
  destination: string;
};

export type NFT = {
  NFTokenID: string;
  Issuer: string;
  URI: string;
  decodedUri?: string;
};

export type NFTs = NFT[];

function User({ name, mint, seed, previous, address, destination }: UserProps) {
  return (
    <div className="text-md flex w-full flex-col items-center justify-center gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription>
            <CopyField text="Address: " content={address} />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-around">
          {mint && <Mint name={name} address={address} seed={seed} />}
          <CreateTransfer
            name={name}
            address={address}
            seed={seed}
            destination={destination}
          />
          <AcceptTransfer
            name={name}
            previous={previous}
            address={address}
            seed={seed}
          />
        </CardContent>
      </Card>
      <Card className="w-full">
        {name === "Platform" ? (
          <CardHeader>
            <CardTitle className="text-lg">{name}'s Vault</CardTitle>
            <CardDescription>
              List of Contracts in {name}'s Vault{" "}
            </CardDescription>
          </CardHeader>
        ) : (
          <CardHeader>
            <CardTitle className="text-lg">{name}'s Signed Contracts</CardTitle>
            <CardDescription>List of {name}'s Signed Contracts</CardDescription>
          </CardHeader>
        )}
        <CardContent>
          <ScrollArea className="flex h-56 flex-col">
            {address && <NFTs address={address} />}
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">{name}'s Contract Mailbox</CardTitle>
            <CardDescription>
              List of {name}'s Contracts in Mailbox
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="flex h-56 flex-col">
              <Transfer address={address} />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default User;
