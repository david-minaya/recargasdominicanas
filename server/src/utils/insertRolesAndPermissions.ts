import * as permissions from '../constants/permissions';
import * as roles from '../constants/roles';
import { Permission } from '../entities/permission.entity';
import { Role } from '../entities/role.entity';
import { RolePermission } from '../entities/rolePermission.entity';

export async function insertRolesAndPermissions() {

  await RolePermission.delete({});
  await Permission.delete({});

  await Permission.insert([
    { id: permissions.ACCESS_TOKEN_UPDATE, name: 'Actualizar los tokens' },
    { id: permissions.APP_RELEASE_CREATE, name: 'Crear lanzamiento de la aplicación' },
    { id: permissions.APP_RELEASE_UPDATE, name: 'Actualizar lanzamientos' },
    { id: permissions.APP_RELEASE_READ, name: 'Leer los lanzamientos' },
    { id: permissions.APP_RELEASE_READ_CURRENT, name: 'Leer el lanzamiento actual' },
    { id: permissions.APP_RELEASE_PUBLISH, name: 'Lanzar una nueva version de la aplicación movil' },
    { id: permissions.APP_RELEASE_DOWNLOAD, name: 'Descargar la ultima version de la aplicación movil' },
    { id: permissions.ADMIN_READ, name: 'Ver administradores' },
    { id: permissions.BANK_CREATE, name: 'Agregar banco' },
    { id: permissions.BANK_READ, name: 'Ver los bancos' },
    { id: permissions.BANK_UPDATE, name: 'Actualizar los bancos' },
    { id: permissions.BANK_ACCOUNT_CREATE, name: 'Agregar cuentas bancarias' },
    { id: permissions.BANK_ACCOUNT_UPDATE, name: 'Actualizar cuentas bancarias' },
    { id: permissions.BANK_ACCOUNT_TRANSFER, name: 'Registrar transferencias' },
    { id: permissions.BUSINESS_CREATE, name: 'Crear negocios' },
    { id: permissions.BUSINESS_CREATE_SALES_REPORT, name: 'Crear el reporte de ventas del negocio' },
    { id: permissions.BUSINESS_READ, name: 'Ver negocio' },
    { id: permissions.BUSINESS_READ_BUSINESS_USERS, name: 'Ver los usuarios de los negocios' },
    { id: permissions.BUSINESS_READ_PRODUCTS, name: 'Ver los productos de los negocios' },
    { id: permissions.BUSINESS_READ_CURRENT_SALES_REPORT, name: 'Ver el reporte de ventas actual del negocio' },
    { id: permissions.BUSINESS_READ_SALES_REPORTS, name: 'Ver los reportes de ventas de los negocios' },
    { id: permissions.BUSINESS_READ_DEPOSITS, name: 'Ver los depositos de los negocios' },
    { id: permissions.BUSINESS_READ_TRANSACTIONS, name: 'Ver las transacciones de los negocios' },
    { id: permissions.BUSINESS_UPDATE, name: 'Actualizar los datos de los negocios' },
    { id: permissions.BUSINESS_USER_CREATE,name: 'Crear los usuarios de los negocios' },
    { id: permissions.BUSINESS_USER_READ, name: 'Ver los usuarios de los negocios' },
    { id: permissions.BUSINESS_USER_UPDATE, name: 'Actualizar los datos de los usuarios de los negocios' },
    { id: permissions.BUSINESS_USER_DELETE, name: 'Borrar los usuarios de los negocios' },
    { id: permissions.BUSINESS_USER_SEND_TRANSACTION, name: 'Enviar transacciones' },
    { id: permissions.CUSTOMER_CREATE, name: 'Crear clientes' },
    { id: permissions.CUSTOMER_READ, name: 'Ver los clientes' },
    { id: permissions.CUSTOMER, name: 'Obtener los datos del cliente logueado' },
    { id: permissions.CUSTOMER_UPDATE, name: 'Actualizar los datos de los clientes' },
    { id: permissions.DEPOSIT_CREATE, name: 'Agregar depositos' },
    { id: permissions.DEPOSIT_READ, name: 'Ver los depositos' },
    { id: permissions.DEPOSIT_UPDATE, name: 'Actualizar los depositos' },
    { id: permissions.FINANCES, name: 'Ver datos financieros de la empresa' },
    { id: permissions.IMAGE_READ, name: 'Leer las imagenes' },
    { id: permissions.NOTIFICATION_TOKEN_ADD, name: 'Agregar token de notificación' },
    { id: permissions.PRODUCT_CREATE, name: 'Agregar productos' },
    { id: permissions.PRODUCT_READ, name: 'Ver los productos' },
    { id: permissions.PRODUCT_UPDATE, name: 'Actualizar los productos' },
    { id: permissions.PROVIDER_READ, name: 'Ver los proveedores' },
    { id: permissions.PROVIDER_CREATE, name: 'Crear proveedores' },
    { id: permissions.PROVIDER_UPDATE, name: 'Actualizar proveedores' },
    { id: permissions.PROVIDER_DELETE, name: 'Borrar proveedores' },
    { id: permissions.PROVIDER_PRODUCT_CREATE, name: 'Agregar los productos de los proveedores' },
    { id: permissions.PROVIDER_PRODUCT_UPDATE, name: 'Actualizar los productos de los proveedores' },
    { id: permissions.PROVIDER_PRODUCT_DELETE, name: 'Borrar los productos de los proveedores' },
    { id: permissions.TRANSACTION_READ, name: 'ver las transacciones' },
    { id: permissions.TRANSACTION_CANCEL, name: 'Cancelar recarga' },
    { id: permissions.SYSTEM_CREATE, name: 'Crear los recursos del sistema' },
    { id: permissions.SYSTEM_READ, name: 'Ver los datos del sistema' },
    { id: permissions.WITHDRAW_CREATE, name: 'Registrar retiros' },
    { id: permissions.WITHDRAW_READ, name: 'Ver los retiros' },
    { id: permissions.WITHDRAW_PROFIT, name: 'Registrar retiro de los beneficios' },
    { id: permissions.SEND_DATA_PLAN, name: 'Enviar planes de datos' }
  ]);

  await insertRole({
    id: roles.OWNER, 
    name: 'Propietario', 
    permissions: [
      permissions.ACCESS_TOKEN_UPDATE,
      permissions.APP_RELEASE_DOWNLOAD,
      permissions.APP_RELEASE_CREATE,
      permissions.APP_RELEASE_UPDATE,
      permissions.APP_RELEASE_READ,
      permissions.APP_RELEASE_READ_CURRENT,
      permissions.APP_RELEASE_PUBLISH,
      permissions.ADMIN_READ,
      permissions.BANK_CREATE,
      permissions.BANK_READ,
      permissions.BANK_UPDATE,
      permissions.BANK_ACCOUNT_CREATE,
      permissions.BANK_ACCOUNT_UPDATE,
      permissions.BANK_ACCOUNT_TRANSFER,
      permissions.BUSINESS_CREATE,
      permissions.BUSINESS_CREATE_SALES_REPORT,
      permissions.BUSINESS_READ,
      permissions.BUSINESS_READ_BUSINESS_USERS,
      permissions.BUSINESS_READ_PRODUCTS,
      permissions.BUSINESS_READ_CURRENT_SALES_REPORT,
      permissions.BUSINESS_READ_SALES_REPORTS,
      permissions.BUSINESS_READ_DEPOSITS,
      permissions.BUSINESS_READ_TRANSACTIONS, 
      permissions.BUSINESS_UPDATE,
      permissions.BUSINESS_USER_CREATE,
      permissions.BUSINESS_USER_READ,
      permissions.BUSINESS_USER_UPDATE,
      permissions.BUSINESS_USER_DELETE,
      permissions.BUSINESS_USER_SEND_TRANSACTION,
      permissions.CUSTOMER,
      permissions.CUSTOMER_CREATE,
      permissions.CUSTOMER_READ,
      permissions.CUSTOMER_UPDATE,
      permissions.DEPOSIT_CREATE, 
      permissions.DEPOSIT_READ,
      permissions.DEPOSIT_UPDATE, 
      permissions.FINANCES,
      permissions.IMAGE_READ,
      permissions.NOTIFICATION_TOKEN_ADD,
      permissions.PRODUCT_CREATE, 
      permissions.PRODUCT_READ,
      permissions.PRODUCT_UPDATE, 
      permissions.PROVIDER_READ,
      permissions.PROVIDER_CREATE,
      permissions.PROVIDER_UPDATE,
      permissions.PROVIDER_DELETE,
      permissions.PROVIDER_PRODUCT_CREATE,
      permissions.PROVIDER_PRODUCT_UPDATE,
      permissions.PROVIDER_PRODUCT_DELETE,
      permissions.SYSTEM_CREATE,
      permissions.SYSTEM_READ,
      permissions.TRANSACTION_CANCEL,
      permissions.WITHDRAW_CREATE,
      permissions.WITHDRAW_READ,
      permissions.WITHDRAW_PROFIT
    ]
  });
  
  await insertRole({
    id: roles.BUSINESS_USER, 
    name: 'Usuario del negocio',
    permissions: [
      permissions.APP_RELEASE_READ_CURRENT,
      permissions.APP_RELEASE_DOWNLOAD,
      permissions.BUSINESS_CREATE_SALES_REPORT,
      permissions.BUSINESS_READ_CURRENT_SALES_REPORT,
      permissions.BUSINESS_READ_PRODUCTS,
      permissions.BUSINESS_USER_READ,
      permissions.BUSINESS_USER_SEND_TRANSACTION,
      permissions.IMAGE_READ,
      permissions.NOTIFICATION_TOKEN_ADD,
      permissions.TRANSACTION_READ,
      permissions.TRANSACTION_CANCEL,
      permissions.SEND_DATA_PLAN
    ]
  });

  await insertRole({
    id: roles.CUSTOMER,
    name: 'Cliente',
    permissions: [
      permissions.CUSTOMER,
      permissions.IMAGE_READ
    ]
  })
}

async function insertRole(role: { id: string, name: string, permissions: string[]}) {
  await Role.save(Role.create({ 
    id: role.id, 
    name: role.name, 
    permissions: role.permissions.map(id => ({ 
      permission: { id } 
    }))
  }));
}
