// Page de connexion TSizer v1.1

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-[#1E4763] flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg">
        <Tabs defaultValue="login">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">Créer un compte</TabsTrigger>
          </TabsList>

          {/* Connexion */}
          <TabsContent value="login">
            <CardContent className="space-y-4">
              <img src="/logo-tsizer.png" alt="Logo TSizer" className="h-16 mx-auto" />
              <h2 className="text-2xl font-bold text-center text-[#1E4763]">Connexion</h2>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="exemple@mail.com" />
              </div>
              <div className="space-y-2">
                <Label>Mot de passe</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full bg-[#95C11F] text-white hover:bg-[#7ea615]">
                Se connecter
              </Button>
              <p className="text-sm text-right text-gray-500 cursor-pointer hover:underline">
                Mot de passe oublié ?
              </p>
            </CardContent>
          </TabsContent>

          {/* Création de compte */}
          <TabsContent value="register">
            <CardContent className="space-y-4">
              <img src="/logo-tsizer.png" alt="Logo TSizer" className="h-16 mx-auto" />
              <h2 className="text-2xl font-bold text-center text-[#1E4763]">Créer un compte</h2>
              <div className="space-y-2">
                <Label>Nom</Label>
                <Input placeholder="Nom" />
              </div>
              <div className="space-y-2">
                <Label>Prénom</Label>
                <Input placeholder="Prénom" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="exemple@mail.com" />
              </div>
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input type="tel" placeholder="06 12 34 56 78" />
              </div>
              <div className="space-y-2">
                <Label>Mot de passe</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full bg-[#95C11F] text-white hover:bg-[#7ea615]">
                S'inscrire
              </Button>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
