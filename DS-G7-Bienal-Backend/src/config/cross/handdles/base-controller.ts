export abstract class BaseController {
  private selectPrisma(include: string) {
    const includeArray = include.split('/');
    if (includeArray.length > 1) {
      const a = includeArray.splice(1, includeArray.length).join('/');
      return { [includeArray[0]]: { select: this.selectPrisma(a) } };
    }
    const atributes = includeArray[0].split('>');
    if (atributes.length > 1) {
      const atributesSelect = atributes[1]
        .split('|')
        .reduce((a, c) => ({ ...a, [c]: true }), {});
      if (atributes[0] === 'select') {
        return atributesSelect;
      } else {
        return { [atributes[0]]: { select: atributesSelect } };
      }
    } else {
      return { [includeArray[0]]: true };
    }
  }
  private mergeObjects(obj1: any, obj2: any): any {
    for (const key in obj2) {
      if (
        typeof obj1[key] === 'object' &&
        typeof obj2[key] === 'object' &&
        !Array.isArray(obj1[key]) &&
        !Array.isArray(obj2[key])
      ) {
        this.mergeObjects(obj1[key], obj2[key]);
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
  /**
   *
   * @param selectStr
   * @returns Prisma.T
   * Transforma un string en Select de Prisma
   * Este string debe tener las siguientes características
   *
   * Atributos: Para indicar los se debe hacer con el caracter >
   * Ej: {tabla}>{stributos}
   *
   * Atributos de un select: deben estar separados por |
   * Ej: id|name
   *
   * Atrinutos de la tabla inicial sebe comenzar con select y luego deben ir los atributos
   * Ej: select>id|name
   *
   * Include: Para indicar el arbol de include debe ser indicado por el caracter |
   * Ej:  Request
   *      Request/status
   *      Request/Document
   *      Request/Document/docAttributes
   *      Request/Document/docAttributes/country
   *
   * @example
   * select>id,name,Request>item|type,Request/status>key|name,Request/Document,Request/Document/docAttributes,Request/Document/docAttributes/country
   * Return:
   *
   *  {
   *    "id": true,
   *    "name": true,
   *    "Request": {
   *      "select": {
   *        "item": true,
   *        "type": true,
   *        "status": { "select": { "key": true, "name": true } },
   *        "Document": {
   *          "select": { "docAttributes": { "select": { "country": true } } }
   *        }
   *      }
   *    }
   *  }
   *
   */
  protected serializerSelectPrisma<T>(selectStr: string): T {
    const includeArray: string[] = selectStr ? selectStr.split(',') : [];
    const select: any = {};
    for (const i of includeArray) {
      this.mergeObjects(select, this.selectPrisma(i));
    }
    return Object.keys(select).length > 0 ? select : null;
  }
}
