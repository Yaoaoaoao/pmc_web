from bson.code import Code
from utils import *

_MAPPER_RELATION_ARGS = Code("""
    function() {
        for (var i in this.relation) {
            if ('argument' in this.relation[i]) {
                // Substrate, site, kinase
                var roles = [null, null, null];
                var args = this.relation[i]['argument'];
                for (var a in args) {
                    var role = args[a]['role'];
                    if (role == 'SUBSTRATE')
                        roles[0] = 'SUBSTRATE';
                    else if (role == 'SITE')
                        roles[1] = 'SITE';
                    else if (role == 'KINASE')
                        roles[2] = 'KINASE';
                }
                emit(roles, 1);
            }
        }
    }
""")

def run():
    rlims = Stat('rlims', 'normalized')
    rlims.basic_counts()
    rlims.counter(_MAPPER_RELATION_ARGS, 'relation_args')
