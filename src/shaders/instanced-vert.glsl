#version 300 es

uniform mat4 u_ViewProj;
uniform float u_Time;

uniform mat3 u_CameraAxes; // Used for rendering particles as billboards (quads that are always looking at the camera)
// gl_Position = center + vs_Pos.x * camRight + vs_Pos.y * camUp;

in vec4 vs_Pos; // Non-instanced; each particle is the same quad drawn in a different place
in vec4 vs_Nor; // Non-instanced, and presently unused
in vec2 vs_UV; // Non-instanced, and presently unused in main(). Feel free to use it for your meshes.

in vec4 vs_Bpos;
in vec4 vs_Blook;
in vec4 vs_Bup;
in vec4 vs_Bright;


out vec4 fs_Col;
out vec4 fs_Pos;
out vec4 fs_Nor;

void main()
{

    fs_Pos = vs_Pos;



    mat4 rot;
    rot[0] = vs_Bpos;
    rot[1] = vs_Blook;
    rot[2] = vs_Bup;
    rot[3] = vs_Bright;
    fs_Nor = transpose(inverse(rot))*vs_Nor;




    vec4 billboardPos =  rot*vs_Pos;//vs_Pos.x * u_CameraAxes[0] + vs_Pos.y * u_CameraAxes[1];



    gl_Position = u_ViewProj * billboardPos;
}
