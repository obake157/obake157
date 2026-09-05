(() => {
  const FACE_COLORS = {
    U: "#f4f6f8",
    D: "#ffd43b",
    F: "#2ecc71",
    B: "#3498db",
    R: "#e74c3c",
    L: "#ff8c32"
  };

  const MOVE_CONFIG = {
    R: { axis: 0, layer: 1, quarter: -1 },
    L: { axis: 0, layer: -1, quarter: 1 },
    U: { axis: 1, layer: 1, quarter: -1 },
    D: { axis: 1, layer: -1, quarter: 1 },
    F: { axis: 2, layer: 1, quarter: -1 },
    B: { axis: 2, layer: -1, quarter: 1 }
  };

  const FACE_NORMALS = {
    U: [0, 1, 0],
    D: [0, -1, 0],
    F: [0, 0, 1],
    B: [0, 0, -1],
    R: [1, 0, 0],
    L: [-1, 0, 0]
  };

  class CubeState {
    constructor() {
      this.reset();
    }

    reset() {
      this.stickers = [];
      this.#addFace("U");
      this.#addFace("D");
      this.#addFace("F");
      this.#addFace("B");
      this.#addFace("R");
      this.#addFace("L");
    }

    #addFace(face) {
      const normal = FACE_NORMALS[face];
      for (let a = -1; a <= 1; a += 1) {
        for (let b = -1; b <= 1; b += 1) {
          let pos;

          switch (face) {
            case "U": pos = [a, 1, b]; break;
            case "D": pos = [a, -1, b]; break;
            case "F": pos = [a, b, 1]; break;
            case "B": pos = [a, b, -1]; break;
            case "R": pos = [1, b, a]; break;
            case "L": pos = [-1, b, a]; break;
            default: throw new Error(`Unknown face: ${face}`);
          }

          this.stickers.push({
            pos,
            normal: [...normal],
            color: FACE_COLORS[face]
          });
        }
      }
    }

    static parseSequence(input) {
      const compact = String(input)
        .toUpperCase()
        .replace(/’/g, "'")
        .replace(/\s+/g, "");

      if (!compact) return [];

      const tokens = compact.match(/[RLUDFB](?:2|')?/g) || [];
      if (tokens.join("") !== compact) {
        throw new Error("Use only R, L, U, D, F and B with optional ' or 2.");
      }

      return tokens;
    }

    applyMove(token) {
      const match = /^([RLUDFB])(2|')?$/.exec(token);
      if (!match) {
        throw new Error(`Invalid move: ${token}`);
      }

      const face = match[1];
      const suffix = match[2] || "";
      const config = MOVE_CONFIG[face];
      const turns = suffix === "2" ? 2 : 1;
      const direction = suffix === "'" ? -config.quarter : config.quarter;

      for (let i = 0; i < turns; i += 1) {
        this.#rotateLayer(config.axis, config.layer, direction);
      }
    }

    #rotateLayer(axis, layer, quarter) {
      for (const sticker of this.stickers) {
        if (sticker.pos[axis] !== layer) continue;
        sticker.pos = this.#rotateVector(sticker.pos, axis, quarter);
        sticker.normal = this.#rotateVector(sticker.normal, axis, quarter);
      }
    }

    #rotateVector([x, y, z], axis, quarter) {
      if (axis === 0) {
        return quarter === 1 ? [x, -z, y] : [x, z, -y];
      }

      if (axis === 1) {
        return quarter === 1 ? [z, y, -x] : [-z, y, x];
      }

      return quarter === 1 ? [-y, x, z] : [y, -x, z];
    }

    getFace(face) {
      const normal = FACE_NORMALS[face];
      const cells = new Array(9);

      for (const sticker of this.stickers) {
        if (!this.#sameVector(sticker.normal, normal)) continue;
        const [row, col] = this.#faceCoordinates(face, sticker.pos);
        cells[row * 3 + col] = sticker.color;
      }

      return cells;
    }

    isSolved() {
      return Object.keys(FACE_NORMALS).every((face) => {
        const cells = this.getFace(face);
        return cells.every((color) => color === cells[0]);
      });
    }

    #sameVector(a, b) {
      return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }

    #faceCoordinates(face, [x, y, z]) {
      switch (face) {
        case "U": return [z + 1, x + 1];
        case "D": return [1 - z, x + 1];
        case "F": return [1 - y, x + 1];
        case "B": return [1 - y, 1 - x];
        case "R": return [1 - y, 1 - z];
        case "L": return [1 - y, z + 1];
        default: throw new Error(`Unknown face: ${face}`);
      }
    }
  }

  window.CubeState = CubeState;
})();
