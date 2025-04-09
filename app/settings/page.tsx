import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <DashboardSidebar />
        </aside>
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold text-primary-dark">Configuración</h1>
              <p className="text-muted-foreground">Gestiona la configuración de tu cuenta y preferencias</p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="account">Cuenta</TabsTrigger>
                <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
                <TabsTrigger value="appearance">Apariencia</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información del Perfil</CardTitle>
                    <CardDescription>
                      Actualiza tu información de perfil y cómo te ven otros en la plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl text-white">
                          J
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm" className="w-full sm:w-auto">
                            Cambiar Avatar
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full sm:w-auto">
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input id="name" defaultValue="Juan Pérez" />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input id="email" type="email" defaultValue="juan@ejemplo.com" />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="title">Cargo</Label>
                        <Input id="title" defaultValue="Gerente de Proyecto" />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="bio">Biografía</Label>
                        <textarea
                          id="bio"
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Cuéntanos sobre ti"
                          defaultValue="Gerente de proyecto experimentado con pasión por flujos de trabajo eficientes y colaboración en equipo."
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button>Guardar Cambios</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de la Cuenta</CardTitle>
                    <CardDescription>Gestiona la configuración y preferencias de tu cuenta</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Cambiar Contraseña</h3>
                      <div className="grid gap-2">
                        <Label htmlFor="current-password">Contraseña Actual</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-password">Nueva Contraseña</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button>Actualizar Contraseña</Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Autenticación de Dos Factores</h3>
                      <p className="text-sm text-muted-foreground">
                        Añade una capa extra de seguridad a tu cuenta habilitando la autenticación de dos factores.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Autenticación de Dos Factores</div>
                          <div className="text-sm text-muted-foreground">
                            Protege tu cuenta con una capa de seguridad adicional
                          </div>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-destructive">Zona de Peligro</h3>
                      <p className="text-sm text-muted-foreground">
                        Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate.
                      </p>
                      <Button variant="destructive">Eliminar Cuenta</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de Notificaciones</CardTitle>
                    <CardDescription>Gestiona cómo y cuándo recibes notificaciones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notificaciones por Correo Electrónico</h3>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Actualizaciones de Proyectos",
                            description: "Recibir correos electrónicos cuando hay actualizaciones en tus proyectos",
                          },
                          {
                            title: "Asignaciones de Tareas",
                            description: "Recibir correos electrónicos cuando se te asignan tareas",
                          },
                          {
                            title: "Comentarios",
                            description: "Recibir correos electrónicos cuando alguien comenta en tus tareas",
                          },
                          {
                            title: "Recordatorios de Fechas Límite",
                            description: "Recibir correos electrónicos sobre próximas fechas límite de tareas",
                          },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">{item.title}</div>
                              <div className="text-sm text-muted-foreground">{item.description}</div>
                            </div>
                            <Switch defaultChecked={i < 3} />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notificaciones en la Aplicación</h3>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Actualizaciones de Proyectos",
                            description: "Recibir notificaciones cuando hay actualizaciones en tus proyectos",
                          },
                          {
                            title: "Asignaciones de Tareas",
                            description: "Recibir notificaciones cuando se te asignan tareas",
                          },
                          {
                            title: "Comentarios",
                            description: "Recibir notificaciones cuando alguien comenta en tus tareas",
                          },
                          {
                            title: "Recordatorios de Fechas Límite",
                            description: "Recibir notificaciones sobre próximas fechas límite de tareas",
                          },
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <div className="font-medium">{item.title}</div>
                              <div className="text-sm text-muted-foreground">{item.description}</div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button>Guardar Cambios</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuración de Apariencia</CardTitle>
                    <CardDescription>Personaliza el aspecto y la sensación de la aplicación</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Tema</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-20 w-full flex-col overflow-hidden rounded-lg border">
                            <div className="h-4 bg-primary"></div>
                            <div className="flex-1 bg-background"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="theme-light"
                              name="theme"
                              className="h-4 w-4 rounded-full border-gray-300"
                              defaultChecked
                            />
                            <Label htmlFor="theme-light">Claro</Label>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-20 w-full flex-col overflow-hidden rounded-lg border">
                            <div className="h-4 bg-primary"></div>
                            <div className="flex-1 bg-gray-900"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="theme-dark"
                              name="theme"
                              className="h-4 w-4 rounded-full border-gray-300"
                            />
                            <Label htmlFor="theme-dark">Oscuro</Label>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-20 w-full flex-col overflow-hidden rounded-lg border">
                            <div className="h-4 bg-primary"></div>
                            <div className="flex-1 bg-gradient-to-b from-white to-gray-900"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="theme-system"
                              name="theme"
                              className="h-4 w-4 rounded-full border-gray-300"
                            />
                            <Label htmlFor="theme-system">Sistema</Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Densidad</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-20 w-full flex-col overflow-hidden rounded-lg border p-2">
                            <div className="h-3 w-full rounded bg-gray-200 mb-1"></div>
                            <div className="h-3 w-full rounded bg-gray-200 mb-1"></div>
                            <div className="h-3 w-full rounded bg-gray-200 mb-1"></div>
                            <div className="h-3 w-full rounded bg-gray-200"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="density-compact"
                              name="density"
                              className="h-4 w-4 rounded-full border-gray-300"
                            />
                            <Label htmlFor="density-compact">Compacto</Label>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-20 w-full flex-col overflow-hidden rounded-lg border p-2">
                            <div className="h-4 w-full rounded bg-gray-200 mb-2"></div>
                            <div className="h-4 w-full rounded bg-gray-200 mb-2"></div>
                            <div className="h-4 w-full rounded bg-gray-200"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="density-default"
                              name="density"
                              className="h-4 w-4 rounded-full border-gray-300"
                              defaultChecked
                            />
                            <Label htmlFor="density-default">Predeterminado</Label>
                          </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex h-20 w-full flex-col overflow-hidden rounded-lg border p-2">
                            <div className="h-5 w-full rounded bg-gray-200 mb-3"></div>
                            <div className="h-5 w-full rounded bg-gray-200"></div>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="density-comfortable"
                              name="density"
                              className="h-4 w-4 rounded-full border-gray-300"
                            />
                            <Label htmlFor="density-comfortable">Cómodo</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button>Guardar Cambios</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

