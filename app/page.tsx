import Link from "next/link"
import { ArrowRight, CheckCircle, Layers, Users } from "lucide-react"
import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary-dark">FlowTask</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-primary">
              Iniciar Sesión
            </Link>
            <Link href="/auth/register">
              <Button>Comenzar</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 relative bg-gradient-to-br from-blue-100 to-indigo-100">
          {/* Elementos decorativos simples */}
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-200/50 mix-blend-multiply filter blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 rounded-full bg-indigo-200/50 mix-blend-multiply filter blur-xl"></div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary-dark">
                    Optimiza tus Proyectos con FlowTask
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Organiza tareas, colabora con tu equipo y realiza seguimiento del progreso en un solo lugar.
                    FlowTask te ayuda a mantener el control de tus proyectos con facilidad.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button size="lg" className="bg-primary hover:bg-primary-dark">
                      Comenzar <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button size="lg" variant="outline">
                      Iniciar Sesión
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[400px] bg-gradient-to-br from-primary-light to-secondary rounded-lg shadow-xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm p-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg mb-4">
                      <h3 className="font-semibold text-primary-dark mb-2">Rediseño de Sitio Web</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Diseño</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">En Progreso</span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-primary-dark"></div>
                          <div className="w-6 h-6 rounded-full bg-primary"></div>
                          <div className="w-6 h-6 rounded-full bg-secondary"></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">3 miembros</span>
                      </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                      <h3 className="font-semibold text-primary-dark mb-2">Desarrollo de App Móvil</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">Desarrollo</span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                          Planificación
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="flex -space-x-2">
                          <div className="w-6 h-6 rounded-full bg-primary-light"></div>
                          <div className="w-6 h-6 rounded-full bg-secondary"></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">2 miembros</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full items-center justify-center py-12 md:py-24 lg:py-32 bg-white">
          <div className="w-full container px-4 md:px-6">
            <div className="w-full flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-full flex justify-center flex-col items-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary-dark">
                  Características que Facilitan la Gestión de Proyectos
                </h2>
                <p className="w-full max-w-[900px] flex justify-center items-center text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  FlowTask proporciona todas las herramientas que necesitas para gestionar tus proyectos de manera
                  eficiente.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary-dark">Tableros Flexibles</h3>
                <p className="text-center text-gray-500">
                  Crea tableros personalizables para visualizar tu flujo de trabajo y seguir el progreso.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary-dark">Colaboración en Equipo</h3>
                <p className="text-center text-gray-500">
                  Invita a miembros del equipo, asigna tareas y colabora en tiempo real.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary-dark">Gestión de Tareas</h3>
                <p className="text-center text-gray-500">
                  Crea, asigna y realiza seguimiento de tareas con fechas límite, prioridades y etiquetas.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
            <div className="flex items-center gap-2">
              <Layers className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary-dark">FlowTask</span>
            </div>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} FlowTask. Todos los derechos reservados.
            </p>
          </div>
          <div className="flex-1"></div>
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
            <div className="font-medium">Producto</div>
            <nav className="flex flex-col gap-2 text-sm text-gray-500">
              <Link href="#" className="hover:text-primary">
                Características
              </Link>
              <Link href="#" className="hover:text-primary">
                Precios
              </Link>
              <Link href="#" className="hover:text-primary">
                Integraciones
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
            <div className="font-medium">Empresa</div>
            <nav className="flex flex-col gap-2 text-sm text-gray-500">
              <Link href="#" className="hover:text-primary">
                Acerca de
              </Link>
              <Link href="#" className="hover:text-primary">
                Blog
              </Link>
              <Link href="#" className="hover:text-primary">
                Carreras
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
            <div className="font-medium">Legal</div>
            <nav className="flex flex-col gap-2 text-sm text-gray-500">
              <Link href="#" className="hover:text-primary">
                Privacidad
              </Link>
              <Link href="#" className="hover:text-primary">
                Términos
              </Link>
              <Link href="#" className="hover:text-primary">
                Contacto
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

